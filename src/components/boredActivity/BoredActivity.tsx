import React, { useState } from 'react'
import styles from './boredActivity.module.scss'

type Activity = {
  activity: string
  type: string
  participants: number
  key: string
}

const BoredActivity: React.FC = () => {
  const [activity, setActivity] = useState<Activity | null>(null)

  const fetchActivity = async () => {
    const response = await fetch(
      'https://www.boredapi.com/api/activity?participants=1',
    )
    const data = await response.json()
    setActivity(data)
  }

  const handleLike = () => {
    if (activity) {
      const activities = JSON.parse(
        window.localStorage.getItem('activities') || '[]',
      )
      if (!activities) {
        window.localStorage.setItem('activities', JSON.stringify([]))
      }
      if (Array.isArray(activities)) {
        window.localStorage.setItem(
          'activities',
          JSON.stringify([...activities, activity]),
        )
      }
    }
    fetchActivity()
  }

  const handleDislike = () => {
    fetchActivity()
  }

  return (
    <section className={'bored-activity'}>
      <h1>Feeling Bored?</h1>
      <p>Here&apos;s an activity for you:</p>
      {activity ? (
        <div>
          <div className={styles.chip}>{activity.type}</div>
          <h2>{activity.activity}</h2>
          <p>Type: {activity.type}</p>
          <p>Participants: {activity.participants}</p>
          <div>
            <button
              className={`${styles.button} ${styles.like} ${styles.active}`}
              onClick={handleLike}
            >
              👍
            </button>
            <button
              className={`${styles.button} ${styles.dislike}`}
              onClick={handleDislike}
            >
              👎
            </button>
          </div>
        </div>
      ) : (
        <button onClick={fetchActivity}>Generate Activity</button>
      )}
    </section>
  )
}

export default BoredActivity
