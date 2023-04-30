import { useEffect, useState } from 'react'
import BoredActivity from 'src/components/boredActivity/BoredActivity'
import Card from 'src/components/card/Card'
import { Activity } from 'src/types/types'
import useBoredAPI from 'src/hooks/useBoredAPI'
import styles from './mainPage.module.scss'

const MainPage = () => {
  const { activity, handleLike, handleDislike } = useBoredAPI()
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('activities') || '[]')
    setActivities(storedItems)
  }, [activities])

  return (
    <>
      <header>
        <h1>Bored Activities</h1>
      </header>
      <main>
        {activity ? <BoredActivity /> : <p>Loading...</p>}
        <section className={styles.cardContainer}>
          {activities
            .map((activity) => (
              <Card
                activity={activity.activity}
                participants={activity.participants}
                type={activity.type}
                key={activity.key}
              />
            ))
            .reverse()}
        </section>
      </main>
    </>
  )
}

export default MainPage
