import Head from 'next/head'
import Meta from '../components/Meta'
import CallToAction from '../components/CallToAction'
import SectionDivider from '../components/SectionDivider'
import FeatureItem from '../components/FeatureItem'
import Footer from '../components/Footer'

import { RiShieldFill, RiSwordFill, RiTreasureMapFill } from 'react-icons/ri'

import { GiBookCover, GiCube } from 'react-icons/gi'
import { FaServer } from 'react-icons/fa'
import styles from '../styles/Home.module.css'




export default function Home() {
  return (
    <>
      <div>
          <Meta title="PVGS | Home"/>
          <CallToAction img='backgroundOne.jpg' />
          <div className={styles.aboutContainer}>
            
            <h1 id={styles.aboutHeading} className={styles.heading}>A LITTLE ABOUT <span >US...</span></h1>
            <p className={styles.text}>During 2020 we decided with everyone isolated what better way to bring people together than to create a server to foster and grow a community. The community is carefully selected through a simple whitelist process and diligently moderated. We care about a seamless experience so we’ve also focused on not only creating quality production quality plugins, but reinforcing the hardware on a pretty beefy machine.</p>

          </div>

          <SectionDivider title="Our Features" img='nightOne.jpg'/>

          <div className={styles.featureSectionContainer}>
            <div className={styles.featureRow}>
              <FeatureItem icon={<RiSwordFill/>} feature="Combat abilities"/>
              <FeatureItem icon={<GiCube />} feature="Claim land"/>
              <FeatureItem icon={<RiShieldFill />} feature="Secured Chests"/>
            </div>
            <div className={styles.featureRow}>
              <FeatureItem icon={<GiBookCover />} feature="Better Enchanting"/>
              <FeatureItem icon={<RiTreasureMapFill />} feature="Waypoints"/>
              <FeatureItem  icon={<FaServer />} feature="Servers & Backups"/>
            </div>
          </div>

          <SectionDivider title="What are you waiting for?" img='nightTwo.png'/>

      </div>
      <Footer />
    </>
  )
}

