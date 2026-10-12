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

# nivel -> (slug, render base, region, es_diagrama)
PORTADAS = {
    "1": [
        ("que-es-blockchain",         "/diagrams/blockchain-simple.svg", None, True),
        ("como-funciona-un-bloque",   "/diagrams/block-structure.svg",   None, True),
        ("mineria-validacion",        "/assets/3d/banner-analitica-onchain.webp", "left",   False),
        ("wallets",                   "/assets/3d/nivel-1-wallet.webp",              "center", False),
        ("claves-publicas-privadas",  "/assets/3d/nivel-1-wallet.webp",              "top",    False),
        ("transacciones-fees",        "/assets/3d/banner-portfolio-csv.webp",        "left",   False),
        ("que-es-token-cripto",       "/assets/3d/banner-analitica-onchain.webp", "right",  False),
        ("buenas-practicas",          "/assets/3d/banner-seguridad.webp",            "left",   False),
        ("evitar-estafas",            "/assets/3d/banner-seguridad.webp",            "right",  False),
        ("cex-vs-dex",                "/assets/3d/banner-wallets-defi.webp",         "left",   False),
        ("seed-phrase-backups",       "/assets/3d/banner-seguridad.webp",            "center", False),
        ("crear-wallet",              "/assets/3d/banner-wallets-defi.webp",         "center", False),
        ("hacer-transaccion",         "/assets/3d/mockup-lead-magnet.webp",          "left",   False),
        ("entender-red",              "/assets/3d/nivel-5-global.webp",              "center", False),
        ("leer-transaccion-explorer", "/assets/3d/banner-analitica-onchain.webp", "center", False),
    ],
    "2": [
        ("funciones-hash",         "/assets/3d/banner-analitica-onchain.webp", "center", False),
        ("merkle-trees",           "/assets/3d/nivel-2-blockchain.webp",      "top",    False),
        ("pow-vs-pos",             "/assets/3d/nivel-2-blockchain.webp",      "right",  False),
        ("gas-evm",                "/assets/3d/banner-portfolio-csv.webp",   "center", False),
        ("nodos",                  "/assets/3d/banner-analitica-onchain.webp", "left",   False),
        ("que-son-smart-contracts", "/assets/3d/banner-wallets-defi.webp",    "center", False),
        ("para-que-sirven",        "/assets/3d/mockup-lead-magnet.webp",     "right",  False),
        ("riesgos-comunes",        "/assets/3d/banner-seguridad.webp",       "left",   False),
        ("oraculos",                "/assets/3d/nivel-5-global.webp",         "top",    False),
        ("oferta-demanda",         "/assets/3d/nivel-3-analitica.webp",     "center", False),
        ("emision",                "/assets/3d/banner-portfolio-csv.webp",  "left",   False),
        ("halving",                "/assets/3d/banner-ruta-progreso.webp",  "right",  False),
        ("quema-de-tokens",        "/assets/3d/banner-seguridad.webp",       "center", False),
        ("market-cap",             "/assets/3d/nivel-3-analitica.webp",     "right",  False),
        ("defi-que-es",            "/assets/3d/banner-wallets-defi.webp",   "wide",   False),
        ("pools-liquidity",        "/assets/3d/banner-portfolio-csv.webp",  "right",  False),
        ("amm-uniswap",            "/assets/3d/mockup-lead-magnet.webp",     "center", False),
        ("lending",                "/assets/3d/nivel-1-wallet.webp",        "left",   False),
        ("staking-yield",          "/assets/3d/banner-ruta-progreso.webp",  "left",   False),
    ],
}


def recorte_16_9(im, region):
    """Recorte suave de un render panoramico, devuelto en 16:9."""
    W, H = im.size
    x0f, y0f, wf = REGIONES[region]
    bw = int(round(W * wf))
    bh = int(round(bw * ALTO / ANCHO))
    if bh > H:  # el render es mas bajo que 16:9: se ajusta el ancho
        bh = H
        bw = int(round(H * ANCHO / ALTO))
    x0 = int(round(W * x0f))
    y0 = int(round(H * y0f))
    x0 = max(0, min(x0, W - bw))
    y0 = max(0, min(y0, H - bh))
    return im.crop((x0, y0, x0 + bw, y0 + bh)).resize((ANCHO, ALTO), Image.LANCZOS)


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
        for i, (slug, base, region, es_svg) in enumerate(PORTADAS[nivel], start=1):
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
                    portada = recorte_16_9(im, region)
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