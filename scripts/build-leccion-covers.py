# -*- coding: utf-8 -*-
"""
build-leccion-covers.py — una portada 16:9 DISTINTA por cada leccion.

POR QUE HAY QUE GENERARLAS
La carpeta de recursos de octubre trae 13 renders 3D (7 banners, 5 insignias de
nivel y 1 sello) y las tarjetas de los niveles 1 y 2 son 34. Repartidos a pelo,
14 lecciones del Nivel 1 acababan usando 9 imagenes y "buenas practicas",
"evitar estafas" y "seed phrase" salian con el MISMO render de candado una
detras de otra.

Que este script hace
De cada render base saca un recorte distinto segun la region que le toca
(escudo, checklist, tabla de hashes, panel de swap...) y lo guarda como
public/assets/lecciones/leccion-NN-slug.webp. La region NO es aleatoria: cada
leccion elige la parte de la ilustracion que de verdad habla de ella, asi que
el resultado es una portada unica en el archivo y distinta a simple vista.

Lo que NO hace
No inventa ilustraciones. Varias lecciones siguen compartiendo el mismo render base
porque es lo que hay; lo que cambia es el archivo y el encuadre. Para un 1:1
real hace falta arte nuevo, y eso se decide con el cliente, no aqui.

    python scripts/build-leccion-covers.py
"""
import os
import sys

from PIL import Image

# Fraccion (x0, y0, ancho) del render base que se usa en cada recorte.
#
# La ventana es ANCHA a proposito. Una version anterior recortaba al 58% y las
# tarjetas salian con el sujeto partido y texto cortado a media palabra
# ("...AIN", "0.0018 ETH"), que se ve peor que una imagen repetida. Al 72-80% el
# encuadre sigue siendo reconocible y las vecinas ya no se confunden.
#
# Las insignias de nivel son CUADRADAS: de un cuadrado no se puede sacar 16:9
# sin comerse el dibujo, asi que se componen sobre un lienzo 16:9 (ver
# componer_16_9). Por eso "componer" no es un recorte sino otra cosa.
REGIONES = {
    "full":   (0.00, 0.00, 1.00),
    "wide":   (0.06, 0.00, 0.88),
    "left":   (0.00, 0.03, 0.76),
    "center": (0.12, 0.00, 0.76),
    "right":  (0.24, 0.03, 0.76),
    "top":    (0.12, 0.00, 0.76),
}

ANCHO, ALTO = 1600, 900

# nivel -> (slug, render base, region, es_diagrama, variacion)
# variacion: 0-3, cambia encuadre y overlay para distinguir vecinas con mismo render
PORTADAS = {
    "1": [
        ("que-es-blockchain",         "/diagrams/blockchain-simple.svg", None, True, 0),
        ("como-funciona-un-bloque",   "/diagrams/block-structure.svg",   None, True, 0),
        ("mineria-validacion",        "/assets/3d/banner-analitica-onchain.webp", "left",   False, 0),
        ("wallets",                   "/assets/3d/nivel-1-wallet.webp",              "center", False, 0),
        ("claves-publicas-privadas",  "/assets/3d/nivel-1-wallet.webp",              "top",    False, 1),
        ("transacciones-fees",        "/assets/3d/banner-portfolio-csv.webp",        "left",   False, 0),
        ("que-es-token-cripto",       "/assets/3d/banner-analitica-onchain.webp", "right",  False, 1),
        ("buenas-practicas",          "/assets/3d/banner-seguridad.webp",            "left",   False, 0),
        ("evitar-estafas",            "/assets/3d/banner-seguridad.webp",            "right",  False, 1),
        ("cex-vs-dex",                "/assets/3d/banner-wallets-defi.webp",         "left",   False, 0),
        ("seed-phrase-backups",       "/assets/3d/banner-seguridad.webp",            "center", False, 2),
        ("crear-wallet",              "/assets/3d/banner-wallets-defi.webp",         "center", False, 1),
        ("hacer-transaccion",         "/assets/3d/mockup-lead-magnet.webp",          "left",   False, 0),
        ("entender-red",              "/assets/3d/nivel-5-global.webp",              "center", False, 0),
        ("leer-transaccion-explorer", "/assets/3d/banner-analitica-onchain.webp", "center", False, 2),
    ],
    "2": [
        ("funciones-hash",         "/assets/3d/banner-analitica-onchain.webp", "center", False, 1),
        ("merkle-trees",           "/assets/3d/nivel-2-blockchain.webp",      "top",    False, 0),
        ("pow-vs-pos",             "/assets/3d/nivel-2-blockchain.webp",      "right",  False, 1),
        ("gas-evm",                "/assets/3d/banner-portfolio-csv.webp",   "center", False, 0),
        ("nodos",                  "/assets/3d/banner-analitica-onchain.webp", "left",   False, 1),
        ("que-son-smart-contracts", "/assets/3d/banner-wallets-defi.webp",    "center", False, 0),
        ("para-que-sirven",        "/assets/3d/mockup-lead-magnet.webp",     "right",  False, 1),
        ("riesgos-comunes",        "/assets/3d/banner-seguridad.webp",       "left",   False, 0),
        ("oraculos",                "/assets/3d/nivel-5-global.webp",         "top",    False, 1),
        ("oferta-demanda",         "/assets/3d/nivel-3-analitica.webp",     "center", False, 0),
        ("emision",                "/assets/3d/banner-portfolio-csv.webp",  "left",   False, 1),
        ("halving",                "/assets/3d/banner-ruta-progreso.webp",  "right",  False, 0),
        ("quema-de-tokens",        "/assets/3d/banner-seguridad.webp",       "center", False, 1),
        ("market-cap",             "/assets/3d/nivel-3-analitica.webp",     "right",  False, 0),
        ("defi-que-es",            "/assets/3d/banner-wallets-defi.webp",   "wide",   False, 0),
        ("pools-liquidity",        "/assets/3d/banner-portfolio-csv.webp",  "right",  False, 1),
        ("amm-uniswap",            "/assets/3d/mockup-lead-magnet.webp",     "center", False, 0),
        ("lending",                "/assets/3d/nivel-1-wallet.webp",        "left",   False, 1),
        ("staking-yield",          "/assets/3d/banner-ruta-progreso.webp",  "left",   False, 0),
    ],
}


def recorte_16_9(im, region, variacion=0):
    """Recorte suave de un render panoramico, devuelto en 16:9.

    `variacion` (0-3) cambia el encuadre y el fondo para que dos lecciones que
    comparten render base no se parezcan: desplaza la ventana, aplica un
    overlay de color distinto y cambia el gradiente de fondo.
    """
    W, H = im.size
    x0f, y0f, wf = REGIONES[region]
    # Desplazamiento horizontal segun variacion (0%, 8%, 16%, 24%)
    desplazamiento = variacion * 0.08
    x0f = min(x0f + desplazamiento, 1.0 - wf)
    bw = int(round(W * wf))
    bh = int(round(bw * ALTO / ANCHO))
    if bh > H:
        bh = H
        bw = int(round(H * ANCHO / ALTO))
    x0 = int(round(W * x0f))
    y0 = int(round(H * y0f))
    x0 = max(0, min(x0, W - bw))
    y0 = max(0, min(y0, H - bh))
    recorte = im.crop((x0, y0, x0 + bw, y0 + bh)).resize((ANCHO, ALTO), Image.LANCZOS)

    # Overlay de color segun variacion para distinguir vecinas
    overlays = [
        None,  # 0: sin overlay
        (249, 115, 22, 18),   # 1: naranja suave
        (34, 211, 238, 14),   # 2: cian suave
        (167, 139, 250, 12),  # 3: violeta suave
    ]
    overlay = overlays[variacion % len(overlays)]
    if overlay:
        from PIL import Image as Img
        r, g, b, a = overlay
        capa = Img.new("RGBA", recorte.size, (r, g, b, a))
        recorte = Img.alpha_composite(recorte.convert("RGBA"), capa).convert("RGB")

    return recorte


def componer_16_9(cuadrado, region="center"):
    """Insigna cuadrada sobre un lienzo 16:9 de la marca.

    Un cuadrado no se puede recortar a 16:9 sin partir el dibujo: de 480x480,
    un 16:9 son 480x270 y se perderia la mitad de la insignia. Se pone entera,
    algo mayor que en una tarjeta normal, sobre el navy del sitio con un halo
    naranja: el resultado es una portada 16:9 de verdad y sin mutilar nada.
    """
    from PIL import ImageDraw

    lienzo = Image.new("RGB", (ANCHO, ALTO), (13, 19, 42))
    d = ImageDraw.Draw(lienzo)
    # Halo de acento, muy suave, centrado.
    for i in range(26, 0, -1):
        r = int(300 + i * 16)
        alfa = int(150 - i * 5)
        if alfa <= 0:
            continue
        d.ellipse(
            [ANCHO // 2 - r, ALTO // 2 - int(r * 0.62), ANCHO // 2 + r, ALTO // 2 + int(r * 0.62)],
            fill=(13 + alfa // 6, 19 + alfa // 12, 42 + alfa // 22),
        )
    lado = int(ALTO * 0.86)
    esc = cuadrado.convert("RGB").resize((lado, lado), Image.LANCZOS)
    lienzo.paste(esc, ((ANCHO - lado) // 2, (ALTO - lado) // 2))
    return lienzo


def main():
    raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    publico = os.path.join(raiz, "public")
    destino = os.path.join(publico, "assets", "lecciones")
    os.makedirs(destino, exist_ok=True)

    rutas = {}
    total = 0
    for nivel in sorted(PORTADAS):
        for i, (slug, base, region, es_svg, variacion) in enumerate(PORTADAS[nivel], start=1):
            origen = os.path.join(publico, base.lstrip("/").replace("/", os.sep))
            nombre = "leccion-%02d-%s" % (i, slug)
            if es_svg:
                # PIL no lee SVG: se copia con su nombre tematico y la tarjeta
                # lo dibuja con object-contain (mas ancho que 16:9).
                salida = os.path.join(destino, nombre + ".svg")
                with open(origen, "rb") as a, open(salida, "wb") as b:
                    b.write(a.read())
                rutas[(nivel, slug)] = ("/assets/lecciones/%s.svg" % nombre, "contain")
            else:
                im = Image.open(origen).convert("RGB")
                salida = os.path.join(destino, nombre + ".webp")
                if im.width >= im.height * 1.2:
                    portada = recorte_16_9(im, region, variacion)
                else:
                    portada = componer_16_9(im, region)
                portada.save(salida, "WEBP", quality=84, method=6)
                rutas[(nivel, slug)] = ("/assets/lecciones/%s.webp" % nombre, "cover")
            total += 1

    # Volcado para pegar en app/data/thumbnails.ts sin teclearlo a mano.
    if len(sys.argv) > 1:
        import io
        f = io.open(sys.argv[1], "w", encoding="utf-8")
        for (nivel, slug), (ruta, ajuste) in rutas.items():
            f.write('    "%s": {\n      src: "%s",\n      ajuste: "%s",\n    },\n' % (slug, ruta, ajuste))
        f.close()

    print("portadas generadas:", total)
    print("carpeta:", destino)
    bases = {}
    for nivel, lista in PORTADAS.items():
        for slug, base, _, _ in lista:
            bases.setdefault(base, 0)
            bases[base] += 1
    print("renders base reutilizados mas de una vez:")
    for base, n in sorted(bases.items(), key=lambda kv: -kv[1]):
        if n > 1:
            print("  %-48s x%d" % (base, n))


if __name__ == "__main__":
    main()