# Material de venta — Aprendamos de Criptomonedas

Inventario de los activos generados y lo que falta para lanzar los funnels en systeme.io.

## Ya generado (listo para usar)

### PDFs descargables (para adjuntar a funnels/cursos de systeme.io)
| Archivo | Nivel | Uso |
|---|---|---|
| `public/resources/kit-nivel-3.pdf` | Nivel 3 | Lead magnet gratuito — ya enlazado en `/recursos` |
| `public/resources/workbook-nivel-4.pdf` | Nivel 4 | Recurso premium del funnel N4 |
| `public/resources/guia-nivel-5.pdf` | Nivel 5 | Recurso premium del funnel N5 |

### Infografías de venta (1200x630 SVG, estilo neon/ámbar)
| Archivo | Nivel |
|---|---|
| `public/sales/nivel-3-infografia.svg` | Nivel 3 — GRATIS |
| `public/sales/nivel-4-infografia.svg` | Nivel 4 — $39 |
| `public/sales/nivel-5-infografia.svg` | Nivel 5 — $45 |

### Imágenes Open Graph (1200x630 PNG para compartir en redes)
| Archivo | Uso |
|---|---|
| `public/sales/nivel-3.png` | OG de `/nivel-3-avanzado` |
| `public/sales/nivel-4.png` | OG de `/nivel-4-experto` |
| `public/sales/nivel-5.png` | OG de `/nivel-5-especializaciones` |

Los 3 PNG y los 3 SVG se regeneran automáticamente con `npm run build` (scripts en `scripts/`).

## Código actualizado

- `app/data/sales.ts` → config central de ofertas + URLs de funnel systeme.io.
- `app/components/LevelSalesPage.tsx` → plantilla de venta de alta conversión (hero, trust bar, pain points, currículo, outcomes, FAQ, CTA repetido).
- `app/components/PremiumGate.tsx` → usa systeme.io, badges de confianza y lista de inclusiones.
- Landing pages N3/N4/N5 → usan `LevelSalesPage` + OG por nivel.
- `/recursos` → pricing con funnels + tarjeta del PDF del N3.

## ⚠️ Acción requerida: URLs de funnel

Las 3 landing, el PremiumGate y `/recursos` apuntan a funnels de systeme.io que TODAVÍA NO EXISTEN:

- `https://aprendamosdecriptomonedas.systeme.io/nivel-3`
- `https://aprendamosdecriptomonedas.systeme.io/nivel-4`
- `https://aprendamosdecriptomonedas.systeme.io/nivel-5`

Editar una sola vez en `app/data/sales.ts` (campo `funnelUrl`).

## Falta crear (te paso lo que necesito de vos)

Para subir de nivel el marketing, hace falta material que no puedo generar:

1. **Video de presentación (60-90s)** — para la sales page. Recomendado: hablás a cámara o screen-capture explicando el problema → promesa → qué incluye cada nivel. Lo subís a YouTube o al hosting de videos de systeme.io.
2. **Fotos/avatars** — para testimonios reales de alumnos (si aún no tenés, no inventes; podés usar la sección de FAQ como prueba social).
3. **Logos de prensa/instituciones** — solo si te mencionan; si no, quitá del futuro.
4. **Imágenes de los diagramas técnicos** — ya tenés varios en `public/diagrams/`. Podés reutilizarlos como miniaturas de lecciones dentro de systeme.io.

## Checklist para lanzar en systeme.io

1. [ ] Crear 3 funnels (N3 opt-in gratis, N4 sales page, N5 sales page) con order form.
2. [ ] Asignar precio: N4 = $39, N5 = $45, N3 = gratis (producto $0 o lead magnet).
3. [ ] Activar PayPal en cada funnel (Settings → Payment gateways).
4. [ ] Subir los PDFs como recursos de las lecciones.
5. [ ] Poner las URLs reales en `app/data/sales.ts`.
6. [ ] Configurar webhook `SALE_NEW` cuando quieras desbloqueo automático por email.
