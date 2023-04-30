import React, { useState } from 'react'
import styles from './card.module.scss'
import Image from 'next/image'
import person from 'src/images/person.svg'

type Activity = {
  activity: string
  type: string
  participants: number
  key: string
}

const Card = ({ activity, type, participants, key }: Activity) => {
  return (
    <article className={styles.card} key={key}>
      <div className={styles.chip}>{type}</div>
      <h2>{activity}</h2>
      <div className={styles.iconContainer}>
        <Image
          width={24}
          height={24}
          priority
          src={person}
          alt="Numer of participants"
        />
        <p>{participants}</p>
      </div>
    </article>
  )
}

export default Card
