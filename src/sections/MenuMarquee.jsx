import styles from './MenuMarquee.module.css'

// All images from the menu folder, loaded automatically
const modules = import.meta.glob('../assets/images/menu/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})
const entries = Object.entries(modules).sort(([a], [b]) => a.localeCompare(b))

// Coffee-box product shots read as a set, so spread them evenly among the
// drink/food photos instead of letting them cluster together in the marquee.
const isBox = ([path]) => /box/i.test(path)
const boxes = entries.filter(isBox).map(([, url]) => url)
const others = entries.filter((e) => !isBox(e)).map(([, url]) => url)

const gap = Math.max(1, Math.floor(others.length / (boxes.length + 1)))
const IMAGES = []
let bi = 0
others.forEach((url, i) => {
  IMAGES.push(url)
  if (bi < boxes.length && (i + 1) % gap === 0) IMAGES.push(boxes[bi++])
})
while (bi < boxes.length) IMAGES.push(boxes[bi++])

export default function MenuMarquee() {
  // Duplicate the set so the track can loop seamlessly
  const loop = [...IMAGES, ...IMAGES]

  return (
    <section className={styles.section}>
      <div className={styles.track}>
        {loop.map((src, i) => (
          <img key={i} src={src} alt="" className={styles.img} aria-hidden="true" />
        ))}
      </div>
    </section>
  )
}
