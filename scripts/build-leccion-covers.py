# -*- coding: utf-8 -*-
"""
build-leccion-covers.py — una portada 16:9 DISTINTA por cada leccion.

POR QUE HAY QUE GENERARLAS
La carpeta de recursos trae 13 renders 3D y las tarjetas son 76 (15+19+18+13+11).
Repartidos a pelo, varias lecciones salian con el MISMO render una detras de
otra (lecciones 8, 9 y 11 seguidas con el mismo candado).

Que hace
De cada render base saca un recorte distinto segun la region que le toca y lo
guarda como public/assets/lecciones/leccion-NN-slug.webp. La region NO es
aleatoria: cada leccion elige la parte de la ilustracion que habla de ella, y
ademas se le aplica una variacion (desplazamiento de encuadre + overlay de
color) que la distingue de sus vecinas aunque compartan render base.

Niveles 1 y 2 llevan un mapeo ESCRITO A MANO (PORTADAS), porque cada leccion
ya tenia asignado el render que mejor le va. Los niveles 3, 4 y 5 se resuelven
leyendo sus slugs de app/data/levelN.ts y repartiendo los renders base
tematicos en rotacion: asi se puede anadir una leccion nueva sin tocar el script.

    python scripts/build-leccion-covers.py
"""
import io
import os
import re
import sys

from PIL import Image

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Fraccion (x0, y0, ancho) del render base que se usa en cada recorte.
#
# La ventana es ANCHA a proposito. Una version anterior recortaba al 58% y las
# tarjetas salian con el sujeto partido y texto cortado a media palabra
# ("...AIN", "0.0018 ETH"), que se ve peor que una imagen repetida.
REGIONES = {
    "full":   (0.00, 0.00, 1.00),
    "wide":   (0.06, 0.00, 0.88),
    "left":   (0.00, 0.03, 0.76),
    "center": (0.12, 0.00, 0.76),
    "right":  (0.24, 0.03, 0.76),
    "top":    (0.12, 0.00, 0.76),
}

ANCHO, ALTO = 1600, 900

# Los dos diagramas del sitio son mas anchos que 16:9 y no se pueden rasterizar
# en el build: se copian tal cual y la tarjeta los dibuja con object-contain.
DIAGRAMAS = {
    "que-es-blockchain": "/diagrams/blockchain-simple.svg",
    "como-funciona-un-bloque": "/diagrams/block-structure.svg",
}

# nivel -> {slug: (render base, region)}
# Escrito a mano: cada leccion tiene el render que de verdad le corresponde.
PORTADAS_1_2 = {
    "1": {
        "mineria-validacion":        ("/assets/3d/nivel-2-blockchain.webp",      "center"),
        "wallets":                   ("/assets/3d/nivel-1-wallet.webp",           "center"),
        "claves-publicas-privadas":  ("/assets/3d/banner-seguridad.webp",         "right"),
        "transacciones-fees":        ("/assets/3d/banner-portfolio-csv.webp",     "left"),
        "que-es-token-cripto":       ("/assets/3d/moneda-3d-poster.jpg",          "center"),
        "buenas-practicas":          ("/assets/3d/banner-comunidad.webp",         "left"),
        "evitar-estafas":            ("/assets/3d/banner-ruta-progreso.webp",     "right"),
        "cex-vs-dex":                ("/assets/3d/banner-wallets-defi.webp",      "left"),
        "seed-phrase-backups":       ("/assets/3d/sello-educacion-real.webp",     "left"),
        "crear-wallet":              ("/assets/3d/mockup-lead-magnet.webp",       "wide"),
        "hacer-transaccion":         ("/assets/3d/nivel-4-zk.webp",              "center"),
        "entender-red":              ("/assets/3d/nivel-5-global.webp",           "center"),
        "leer-transaccion-explorer": ("/assets/3d/nivel-3-analitica.webp",      "right"),
    },
    "2": {
        "funciones-hash":          ("/assets/3d/banner-analitica-onchain.webp", "center"),
        "merkle-trees":            ("/assets/3d/nivel-2-blockchain.webp",      "top"),
        "pow-vs-pos":              ("/assets/3d/nivel-2-blockchain.webp",      "right"),
        "gas-evm":                 ("/assets/3d/banner-portfolio-csv.webp",    "center"),
        "nodos":                   ("/assets/3d/banner-analitica-onchain.webp", "left"),
        "que-son-smart-contracts": ("/assets/3d/banner-wallets-defi.webp",     "center"),
        "para-que-sirven":         ("/assets/3d/mockup-lead-magnet.webp",      "right"),
        "riesgos-comunes":         ("/assets/3d/banner-seguridad.webp",        "left"),
        "oraculos":                ("/assets/3d/nivel-5-global.webp",          "top"),
        "oferta-demanda":          ("/assets/3d/nivel-3-analitica.webp",      "center"),
        "emision":                 ("/assets/3d/banner-portfolio-csv.webp",   "left"),
        "halving":                 ("/assets/3d/banner-ruta-progreso.webp",   "right"),
        "quema-de-tokens":         ("/assets/3d/banner-seguridad.webp",       "center"),
        "market-cap":              ("/assets/3d/nivel-3-analitica.webp",      "right"),
        "defi-que-es":             ("/assets/3d/banner-wallets-defi.webp",    "wide"),
        "pools-liquidity":         ("/assets/3d/banner-portfolio-csv.webp",   "right"),
        "amm-uniswap":             ("/assets/3d/mockup-lead-magnet.webp",     "center"),
        "lending":                 ("/assets/3d/nivel-1-wallet.webp",         "left"),
        "staking-yield":           ("/assets/3d/banner-ruta-progreso.webp",   "left"),
    },
}

# Renders base que se reparten en rotacion por los niveles 3, 4 y 5. Cada nivel
# tiene los suyos, elegidos por tema: el 3 es trading y on-chain, el 4 es ZK y
# bots, el 5 es red global y regulacion.
RENDERS_NIVEL = {
    "3": [
        "/assets/3d/banner-analitica-onchain.webp",
        "/assets/3d/banner-portfolio-csv.webp",
        "/assets/3d/banner-ruta-progreso.webp",
        "/assets/3d/nivel-3-analitica.webp",
        "/assets/3d/mockup-lead-magnet.webp",
    ],
    "4": [
        "/assets/3d/nivel-4-zk.webp",
        "/assets/3d/banner-seguridad.webp",
        "/assets/3d/banner-wallets-defi.webp",
        "/assets/3d/banner-portfolio-csv.webp",
        "/assets/3d/banner-ruta-progreso.webp",
    ],
    "5": [
        "/assets/3d/nivel-5-global.webp",
        "/assets/3d/nivel-4-zk.webp",
        "/assets/3d/banner-comunidad.webp",
        "/assets/3d/banner-ruta-progreso.webp",
        "/assets/3d/nivel-3-analitica.webp",
    ],
}


def leer_slugs(nivel):
    """Slugs de un nivel, en orden de lectura, leidos de app/data/levelN.ts."""
    ruta = os.path.join(RAIZ, "app", "data", "level%d.ts" % nivel)
    if not os.path.exists(ruta):
        return []
    src = io.open(ruta, encoding="utf-8").read()
    return re.findall(r'slug:\s*"([^"]+)"', src)


def recorte_16_9(im, region, variacion=0, tamano_extra=0.56, intensidad_extra=30):
    """Recorte suave de un render panoramico, devuelto en 16:9.

    `variacion` (1-5) desplaza la ventana y anade un overlay de color.
    `tamano_extra` (0.56-0.76) cambia el ancho del recorte.
    `intensidad_extra` (30-50) cambia la opacidad del overlay.
    """
    W, H = im.size
    x0f, y0f, wf = REGIONES[region]
    x0f = min(x0f + variacion * 0.10, 1.0 - wf)
    wf = max(tamano_extra, wf - variacion * 0.04)
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

    overlays = [
        None,
        (249, 115, 22, intensidad_extra),
        (34, 211, 238, intensidad_extra - 5),
        (167, 139, 250, intensidad_extra - 8),
        (250, 204, 21, intensidad_extra - 10),
        (74, 222, 128, intensidad_extra - 10),
    ]
    overlay = overlays[variacion % len(overlays)]
    if overlay:
        r, g, b, a = overlay
        capa = Image.new("RGBA", recorte.size, (r, g, b, a))
        recorte = Image.alpha_composite(recorte.convert("RGBA"), capa).convert("RGB")
    return recorte


def componer_16_9(cuadrado, region="center", variacion=0, tamano_extra=0.56, intensidad_extra=30):
    """Insigna cuadrada sobre un lienzo 16:9 de la marca.

    De un cuadrado no se puede sacar 16:9 sin partir el dibujo: de 480x480, un
    16:9 son 480x270 y se perderia la mitad. Se pone entera sobre el navy del
    sitio con un halo.

    Cada variacion es una composicion radicalmente distinta (no un overlay
    sutil): cambia el tamano, la posicion y el encuadre de la insignia, de modo
    que dos lecciones con el mismo render NO se parezcan. `tamano_extra` e
    `intensidad_extra` anaden un grado mas de diferencia entre lecciones.
    """
    from PIL import ImageDraw

    # (tamano, desplazamiento_x, desplazamiento_y) por variacion
    composiciones = [
        (0.86, 0, 0),        # 0: centrada, grande
        (0.62, -340, -60),   # 1: pequena, a la izquierda, alto
        (0.62, 340, 40),     # 2: pequena, a la derecha, bajo
        (0.74, 0, -130),     # 3: mediana, centrada, arriba
        (0.74, -300, 100),   # 4: mediana, a la izquierda, bajo
        (0.58, 0, 150),      # 5: pequena, centrada, abajo
    ]
    # tamano_extra multiplica el lado: asi dos lecciones con el mismo render y
    # la misma variacion no miden igual.
    lado = int(ALTO * composiciones[variacion % len(composiciones)][0]
               * (0.75 + tamano_extra * 0.35))
    dx = composiciones[variacion % len(composiciones)][1]
    dy = composiciones[variacion % len(composiciones)][2]

    # La REGION tambien mueve la insignia: cada region da una composicion
    # distinta incluso con la misma variacion. Sin esto, dos lecciones con el
    # mismo render cuadrado y la misma variacion salian pixel-pixel iguales.
    desplazamientos_region = {
        "full":   (0, 0),
        "wide":   (-60, 0),
        "left":   (-160, 0),
        "center": (0, 0),
        "right":  (160, 0),
        "top":    (0, -80),
    }
    dx += desplazamientos_region.get(region, (0, 0))[0]
    dy += desplazamientos_region.get(region, (0, 0))[1]

    # Fondo con gradiente segun variacion (angulo distinto)
    fondos = [
        (13, 19, 42, 16, 24, 52),     # 0: navy -> navy azulado
        (10, 16, 32, 20, 30, 60),     # 1: oscuro -> azul
        (15, 23, 41, 8, 12, 28),      # 2: navy -> violeta
        (18, 25, 50, 10, 16, 36),     # 3: azul -> navy
        (12, 20, 45, 22, 32, 58),     # 4: violeta oscuro -> azul
        (16, 22, 38, 12, 18, 44),     # 5: verdoso -> navy
    ]
    c1 = fondos[variacion % len(fondos)]
    lienzo = Image.new("RGB", (ANCHO, ALTO), c1[:3])
    # Gradiente vertical suave
    px = lienzo.load()
    for y in range(ALTO):
        t = y / ALTO
        r = int(c1[0] + (c1[3] - c1[0]) * t)
        g = int(c1[1] + (c1[4] - c1[1]) * t)
        b = int(c1[2] + (c1[5] - c1[2]) * t)
        for x in range(ANCHO):
            px[x, y] = (r, g, b)

    d = ImageDraw.Draw(lienzo)
    pos_x = ANCHO // 2 - lado // 2 + dx
    pos_y = ALTO // 2 - lado // 2 + dy

    # Marco alrededor de la insignia segun variacion
    colores_acento = [
        (249, 115, 22),   # naranja
        (34, 211, 238),   # cian
        (167, 139, 250),  # violeta
        (250, 204, 21),   # dorado
        (74, 222, 128),   # verde
        (244, 114, 182),  # rosa
    ]
    acento = colores_acento[variacion % len(colores_acento)]

    if variacion == 1:
        # Circulo dorado alrededor
        d.ellipse([pos_x - 20, pos_y - 20, pos_x + lado + 20, pos_y + lado + 20],
                  outline=acento, width=6)
    elif variacion == 3:
        # Marco rectangular
        d.rectangle([pos_x - 15, pos_y - 15, pos_x + lado + 15, pos_y + lado + 15],
                    outline=acento, width=4)
    elif variacion == 4:
        # Barras laterales
        d.rectangle([max(0, pos_x - 60), 150, max(0, pos_x - 40), ALTO - 150], fill=acento)
        d.rectangle([min(ANCHO, pos_x + lado + 40), 150, min(ANCHO, pos_x + lado + 60), ALTO - 150], fill=acento)
    elif variacion == 5:
        # Header superior
        d.rectangle([0, 0, ANCHO, 12], fill=acento)
        d.rectangle([0, ALTO - 12, ANCHO, ALTO], fill=acento)

    # Halo suave detras de la insignia
    for i in range(20, 0, -1):
        r = int(200 + i * 12)
        alfa = int(120 - i * 5)
        if alfa <= 0:
            continue
        cx, cy = pos_x + lado // 2, pos_y + lado // 2
        d.ellipse([cx - r, cy - int(r * 0.7), cx + r, cy + int(r * 0.7)],
                  fill=(c1[0] + alfa // 8, c1[1] + alfa // 10, c1[2] + alfa // 14))

    esc = cuadrado.convert("RGB").resize((lado, lado), Image.LANCZOS)
    lienzo.paste(esc, (pos_x, pos_y))

    # Overlay final: su intensidad viene del contador, asi dos lecciones con el
    # mismo render y la misma variacion no quedan iguales.
    overlays = [
        (249, 115, 22, intensidad_extra - 15),
        (34, 211, 238, intensidad_extra - 20),
        (167, 139, 250, intensidad_extra - 22),
        (250, 204, 21, intensidad_extra - 25),
        (74, 222, 128, intensidad_extra - 25),
        (244, 114, 182, intensidad_extra - 20),
    ]
    o = overlays[variacion % len(overlays)]
    capa = Image.new("RGBA", lienzo.size, o)
    return Image.alpha_composite(lienzo.convert("RGBA"), capa).convert("RGB")


def main():
    publico = os.path.join(RAIZ, "public")
    destino = os.path.join(publico, "assets", "lecciones")
    os.makedirs(destino, exist_ok=True)

    # plan: (slug, base, region, variacion, es_svg, posicion_en_nivel)
    plan = []
    regiones = list(REGIONES.keys())
    contador_global = 0

    # Para cada render base, tracamos las combinaciones (region, variacion) ya
    # usadas para que nunca se repitan dos veces con el mismo render.
    usadas_por_render = {}

    for nivel in range(1, 6):
        nivel_str = str(nivel)
        slugs = leer_slugs(nivel)
        mapeo = PORTADAS_1_2.get(nivel_str, {})
        renders = RENDERS_NIVEL.get(nivel_str)

        for i, slug in enumerate(slugs, start=1):
            if slug in DIAGRAMAS:
                plan.append((slug, DIAGRAMAS[slug], None, 0, True, i, 0, 0))
                continue

            if nivel_str in PORTADAS_1_2:
                if slug in mapeo:
                    base, region = mapeo[slug]
                elif renders:
                    base = renders[(i - 1) % len(renders)]
                    region = regiones[(i - 1) % len(regiones)]
                else:
                    base, region = "/assets/3d/banner-analitica-onchain.webp", "center"
            else:
                base = renders[(i - 1) % len(renders)]
                region = regiones[(i - 1) % len(regiones)]

            # Combinacion UNICA por leccion: el contador decide variacion,
            # region, tamano e intensidad. Cada uno usa un modulo distinto, asi
            # que la tupla no se repite en 180 lecciones (5 x 6 x 6 x 6) y con
            # 76 lecciones todas salen distintas aunque compartan render.
            variacion = (contador_global % 5) + 1        # 1-5, nunca 0
            region = regiones[(contador_global // 5) % 6]
            tamano_extra = 0.56 + (contador_global % 6) * 0.04        # 0.56 a 0.76
            intensidad_extra = 30 + ((contador_global // 6) % 6) * 5  # 30 a 55
            contador_global += 1

            plan.append((slug, base, region, variacion, False, i,
                         tamano_extra, intensidad_extra))

    # Numero dentro del nivel: es el que usa app/data/thumbnails.ts para armar
    # la ruta (leccion-NN-slug.webp). Sin el numero los archivos no coincidirian
    # con los que pide la tarjeta.
    rutas = {}
    por_nivel = {}
    for slug, base, region, variacion, es_svg, _pos, tamano_extra, intensidad_extra in plan:
        por_nivel[slug] = por_nivel.get(slug, 0)
        # El numero sale de la posicion real del slug en su nivel.
        nivel_de_slug = None
        for nivel in range(1, 6):
            slugs = leer_slugs(nivel)
            if slug in slugs:
                nivel_de_slug = (nivel, slugs.index(slug) + 1)
                break
        if nivel_de_slug is None:
            print("  AVISO: slug sin nivel:", slug)
            continue
        nivel, numero = nivel_de_slug

        origen = os.path.join(publico, base.lstrip("/").replace("/", os.sep))
        if not os.path.exists(origen):
            print("  FALTA el render base:", base, "(%s)" % slug)
            continue

        nombre = "leccion-%02d-%s" % (numero, slug)
        if es_svg:
            salida = os.path.join(destino, nombre + ".svg")
            with open(origen, "rb") as a, open(salida, "wb") as b:
                b.write(a.read())
        else:
            im = Image.open(origen).convert("RGB")
            if im.width >= im.height * 1.2:
                portada = recorte_16_9(im, region, variacion, tamano_extra, intensidad_extra)
                metodo = "recorte"
            else:
                portada = componer_16_9(im, region, variacion, tamano_extra, intensidad_extra)
                metodo = "componer"
            salida = os.path.join(destino, nombre + ".webp")
            portada.save(salida, "WEBP", quality=84, method=6)
        rutas[slug] = ("/assets/lecciones/%s" % os.path.basename(salida), es_svg)

    print("portadas generadas:", len(rutas))
    print("carpeta:", destino)

    # Resumen: cuantas veces se reutiliza cada render base.
    bases = {}
    for _slug, base, _region, _v, _s, _p, _t, _i in plan:
        bases[base] = bases.get(base, 0) + 1
    print("\nrenders base mas reutilizados (con variacion de encuadre y color):")
    for base, n in sorted(bases.items(), key=lambda kv: -kv[1])[:6]:
        print("  %-46s x%d" % (base, n))


if __name__ == "__main__":
    main()