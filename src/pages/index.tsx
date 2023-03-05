import styles from '@/styles/Home.module.css'
import Layout from '@/components/layout'
export default function Home() {
  return (
    <Layout title={title}>
      <div id="box" className={styles['box']}>
        <div id="subbox" className={styles['subbox']}>
        </div>
      </div>
    </Layout>
  )
}
