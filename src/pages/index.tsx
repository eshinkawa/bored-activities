import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from 'src/styles/Home.module.scss'
import BoredActivity from 'src/components/boredActivity'
import { useEffect, useState } from 'react'
import useBoredAPI from 'src/hooks/useBoredAPI'
import { set } from 'immutable'

const inter = Inter({ subsets: ['latin'] })

interface Activity {
  activity: string
  type: string
  participants: number
  price: number
  key: string
}
export default function Home() {
  const { activity, handleLike, handleDislike } = useBoredAPI()
  const [activities, setActivities] = useState<Activity[] | null>([])

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('activities') || '[]')
    setActivities(storedItems)
  }, [activities])

  return (
    <div className="App">
      <header>
        <h1>Bored Activities</h1>
      </header>
      <main>
        {activity ? (
          <BoredActivity
            activity={activity}
            onLike={handleLike}
            onDislike={handleDislike}
          />
        ) : (
          <p>Loading...</p>
        )}
        {activities.length > 0
          ? activities.map((activity) => {
              return (
                <div key={activity.key} style={{ color: 'white' }}>
                  {activity.activity}
                </div>
              )
            })
          : null}
      </main>
    </div>
  )
}
