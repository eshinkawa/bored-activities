import { useState, useEffect } from 'react'

const API_URL = 'https://www.boredapi.com/api/activity'

type Activity = {
  activity: string
  type: string
  participants: number
  price: number
  link: string
  key: string
  accessibility: number
}

const useBoredAPI = () => {
  const [activity, setActivity] = useState<Activity | null>(null)

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setActivity(data))
      .catch((error) => console.error(error))
  }, [])

  const handleLike = () => {
    if (activity) {
      localStorage.setItem(activity.key, JSON.stringify(activity))
      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => setActivity(data))
        .catch((error) => console.error(error))
    }
  }

  const handleDislike = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setActivity(data))
      .catch((error) => console.error(error))
  }

  return { activity, handleLike, handleDislike }
}

export default useBoredAPI
