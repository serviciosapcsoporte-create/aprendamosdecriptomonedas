# -*- coding: utf-8 -*-
"""
build-3d-assets.py — genera los recursos 3D de la landing en public/assets/3d/

QUE HACE
Los renders 3D llegan en pliegos (una hoja con las 5 insignias de nivel, una
hoja con banners sueltos). Este script recorta lo que el sitio necesita:

  1. Iconos de los 5 niveles, SIN el rotulo en ingles del pliego: la tarjeta del
     sitio ya pone el nombre del nivel en espanol. El recorte es cuadrado y se
     corta justo en la linea que separa el icono del rotulo.
  2. El fondo navy del pliego se re-mapea al valor EXACTO de --navy en
     app/styles.css. Por eso las tarjetas de nivel van en bg-navy: el recorte
     desaparece y no se ve ni un borde.
  3. Los banners 16:9 se reescalan a WebP.

COMO SE USA
  python scripts/build-3d-assets.py "<carpeta de recursos>" [destino]

El destino por defecto es public/assets/3d. El video del hero NO lo genera este
script: se optimiza aparte con ffmpeg (sin audio, CRF 27, faststart).

DEPENDENCIAS
  pip install pillow
"""
import os
import sys

from PIL import Image

# Relleno de las tarjetas del pliego de insignias y navy de la seccion de
# niveles. Deben coincidir con --navy de app/styles.css o se ve la costura.
CARD_FILL = (13, 25, 57)
NAVY = (15, 23, 41)  # hsl(222 47% 11%)

# Cajas de las 5 tarjetas medidas sobre el pliego de 1920x1280.
CARDS = [
    (1, 128, 72, 639, 625),  # Secure Wallet
    (2, 708, 72, 1209, 625),  # Blockchain Nodes
    (3, 1280, 72, 1791, 625),  # Analytics Chart
    (4, 368, 666, 901, 1220),  # ZK Shield
    (5, 1017, 666, 1550, 1220),  # Global Network
]

ICON_SLUG = {1: "wallet", 2: "blockchain", 3: "analitica", 4: "zk", 5: "global"}

# (archivo origen, archivo destino, ancho de salida en px)
BANNERS = [
    ("Mockup del Lead Magnet.jpg", "mockup-lead-magnet.webp", 1600),
    ("An\u00e1lisis On-Chain  CSV.jpg", "banner-analitica-onchain.webp", 1600),
    ("Seguridad  Estafas.jpg", "banner-seguridad.webp", 1600),
    ("Tutoriales  Wallets.jpg", "banner-wallets-defi.webp", 1600),
    ("image_20261006_000229.jpg", "banner-portfolio-csv.webp", 1600),
    ("+1,500 Descargas CSV.jpg", "banner-ruta-progreso.webp", 1600),
    ("Captura de Comunidad (Placeholder).jpg", "banner-comunidad.webp", 1600),
    ("Educaci\u00f3n 100% Real.jpg", "sello-educacion-real.webp", 800),
]

SHEET_NAME = "Set de Insignias 3D para los Niveles.jpg"
SHEET_SIZE = (1920, 1280)


def resolver(src, nombre):
    """Ruta exacta del archivo pedido; si no esta, la primera que case con la
    extension (los nombres de la carpeta traen acentos y doble espacio)."""
    p = os.path.join(src, nombre)
    if os.path.exists(p):
        return p
    ext = os.path.splitext(nombre)[1] or ".jpg"
    for n in os.listdir(src):
        if n.lower().endswith(ext.lower()):
            return os.path.join(src, n)
    raise FileNotFoundError(nombre)


def corridas(idx, minimo):
    """Agrupa indices contiguos; devuelve solo las corridas de >= minimo."""
    if not idx:
        return []
    out, cur = [], [idx[0]]
    for v in idx[1:]:
        if v == cur[-1] + 1:
            cur.append(v)
        else:
            if len(cur) >= minimo:
                out.append(cur)
            cur = [v]
    if len(cur) >= minimo:
        out.append(cur)
    return out


def extraer_icono(pliego, caja):
    """Recorta el icono 3D de una tarjeta del pliego."""
    x0, y0, x1, y1 = caja
    tarjeta = pliego.crop((x0 + 4, y0 + 4, x1 - 3, y1 - 3)).convert("RGB")
    w, h = tarjeta.size
    px = tarjeta.load()
    rf0, rf1, rf2 = CARD_FILL

    def dist(x, y):
        p = px[x, y]
        return abs(p[0] - rf0) + abs(p[1] - rf1) + abs(p[2] - rf2)

    # 1) Linea de corte entre el icono y el rotulo: el hueco de filas "vacias"
    #    mas ancho por debajo de la mitad de la tarjeta.
    filas = []
    for y in range(h):
        c = 0
        for x in range(0, w, 2):
            if dist(x, y) > 55:
                c += 1
        filas.append(c)
    vacias = [y for y, c in enumerate(filas) if c <= max(2, (w // 2) * 0.012)]
    huecos = [g for g in corridas(vacias, 8) if g[0] > h * 0.45]
    corte = (huecos[0][0] + huecos[0][-1]) // 2 if huecos else h

    # 2) Caja del artwork dentro de [0, corte].
    cols = []
    for x in range(w):
        c = 0
        for y in range(corte):
            if dist(x, y) > 55:
                c += 1
        cols.append(c)
    activas = [x for x, c in enumerate(cols) if c > max(3, corte * 0.02)]
    cr = corridas(activas, 8) if activas else []
    ax0, ax1 = (
        (min(r[0] for r in cr), max(r[-1] for r in cr)) if cr else (0, w - 1)
    )

    # 3) Recorte cuadrado centrado, con 10% de aire. El lado nunca pasa de
    #    `corte`: es justo lo que impide que entren los pixels del rotulo.
    lado = int(max(ax1 - ax0, corte - 1) * 1.10)
    lado = max(64, min(lado, w, h, corte))
    cx = (ax0 + ax1) // 2
    sx = max(0, min(w - lado, cx - lado // 2))
    sy = max(0, min(corte - lado, (corte - 1) // 2 - lado // 2))
    icono = tarjeta.crop((sx, sy, sx + lado, sy + lado))

    # 4) Re-mapeo suave del relleno navy al navy de la seccion. Se hace por
    #    rampa y no con alfa para no comerse las partes oscuras del artwork
    #    (el interior del escudo ZK, las caras de los cubos).
    out = icono.load()
    d0, d1, d2 = NAVY[0] - rf0, NAVY[1] - rf1, NAVY[2] - rf2
    for y in range(icono.size[1]):
        for x in range(icono.size[0]):
            p = out[x, y]
            d = abs(p[0] - rf0) + abs(p[1] - rf1) + abs(p[2] - rf2)
            if d > 44:
                continue
            t = 1.0 if d <= 18 else (44.0 - d) / 26.0
            out[x, y] = (
                max(0, min(255, int(p[0] + d0 * t))),
                max(0, min(255, int(p[1] + d1 * t))),
                max(0, min(255, int(p[2] + d2 * t))),
            )
    return icono


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    src = sys.argv[1]
    raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    dst = sys.argv[2] if len(sys.argv) > 2 else os.path.join(raiz, "public", "assets", "3d")
    os.makedirs(dst, exist_ok=True)

    pliego = Image.open(resolver(src, SHEET_NAME)).convert("RGB")
    if pliego.size != SHEET_SIZE:
        raise SystemExit(
            "el pliego mide %s y se esperaba %s: vuelve a medir las cajas CARDS"
            % (pliego.size, SHEET_SIZE)
        )
    print("pliego:", pliego.size)

    for nivel, x0, y0, x1, y1 in CARDS:
        icono = extraer_icono(pliego, (x0, y0, x1, y1))
        nombre = "nivel-%d-%s.webp" % (nivel, ICON_SLUG[nivel])
        icono.save(os.path.join(dst, nombre), "WEBP", quality=90, method=6)
        print("icono nivel %d -> %s %s" % (nivel, nombre, icono.size))

    for origen, destino, ancho in BANNERS:
        ruta = os.path.join(src, origen)
        if not os.path.exists(ruta):
            print("FALTA:", origen)
            continue
        im = Image.open(ruta).convert("RGB")
        if im.width > ancho:
            im = im.resize((ancho, round(im.height * ancho / im.width)), Image.LANCZOS)
        im.save(os.path.join(dst, destino), "WEBP", quality=82, method=6)
        print(
            "banner -> %-34s %s  %.0f KB"
            % (destino, im.size, os.path.getsize(os.path.join(dst, destino)) / 1024)
        )


if __name__ == "__main__":
    main()