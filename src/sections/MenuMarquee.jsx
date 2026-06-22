import styles from './MenuMarquee.module.css'

// All images from the menu folder, loaded automatically
const modules = import.meta.glob('../assets/images/menu/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})
const IMAGES = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url)

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
