// Create a separate component for the LastUpdatedIndicator
"use client"

import { useState, useEffect } from "react"
import { RefreshCw } from "lucide-react"

export function LastUpdatedIndicator() {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  useEffect(() => {
    // Set the current time as the last updated time
    setLastUpdated(new Date().toLocaleString())

    // Update the time every minute
    const intervalId = setInterval(() => {
      setLastUpdated(new Date().toLocaleString())
    }, 60000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="flex items-center text-xs text-muted-foreground">
      <RefreshCw className="h-3 w-3 mr-1" />
      Last updated: {lastUpdated || "Unknown"}
    </div>
  )
}

