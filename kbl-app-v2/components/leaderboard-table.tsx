"use client"

import { useEffect, useState } from "react"
import { Trophy, ChevronUp, ChevronDown, Minus } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { fetchLeaderboardData } from "@/lib/sheets-api"

interface LeaderboardEntry {
  rank: number
  team: string
  matchesPlayed: number
  points: number
  previousRank?: number
  owner?: string
}

export default function LeaderboardTable() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchLeaderboardData()

        // Assign ranks, handling ties
        const rankedData = data
          .sort((a, b) => b.points - a.points) // Sort by points in descending order
          .map((team, index, array) => ({
            ...team,
            rank:
              index > 0 && team.points === array[index - 1].points
                ? array[index - 1].rank // Keep same rank for ties
                : index + 1,
          }))

        setLeaderboard(rankedData)
      } catch (error) {
        console.error("Failed to fetch leaderboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()

    // Poll data every minute
    const intervalId = setInterval(loadData, 60000)
    return () => clearInterval(intervalId)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-20">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    )
  }
  

  const getInitials = (name: string) => {
    return name
      .split(" (")[0]
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const getAvatarColor = (name: string) => {
    const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"]
    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }

  const getRankChange = (current: number, previous?: number) => {
    if (!previous || current === previous) return <Minus className="h-4 w-4 text-gray-400" />
    return current < previous ? (
      <div className="flex items-center text-green-500">
        <ChevronUp className="h-4 w-4 mr-1" />
        <span className="text-xs">{previous - current}</span>
      </div>
    ) : (
      <div className="flex items-center text-red-500">
        <ChevronDown className="h-4 w-4 mr-1" />
        <span className="text-xs">{current - previous}</span>
      </div>
    )
  }

  // Get teams that rank 1, 2, or 3 (considering ties)
  const topTeams = leaderboard.filter((entry) => entry.rank <= 3)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {topTeams.map((entry) => (
          <Card
            key={entry.team}
            className={`overflow-hidden ${entry.rank === 1 ? "border-yellow-500" : entry.rank === 2 ? "border-gray-400" : "border-amber-700"}`}
          >
            <div className={`h-2 ${entry.rank === 1 ? "bg-yellow-500" : entry.rank === 2 ? "bg-gray-400" : "bg-amber-700"}`}></div>
            <CardContent className="pt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className={`h-12 w-12 ${getAvatarColor(entry.team)}`}>
                    <AvatarFallback>{getInitials(entry.team)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-1 -right-1 rounded-full bg-background flex items-center justify-center w-6 h-6 border-2 border-background">
                    <Trophy className={`h-3 w-3 ${entry.rank === 1 ? "text-yellow-500" : entry.rank === 2 ? "text-gray-400" : "text-amber-700"}`} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold">{entry.team.split(" (")[0]}</h3>
                  <p className="text-sm text-muted-foreground">{entry.owner}</p>
                  <p className="text-xs text-muted-foreground">{entry.matchesPlayed} matches</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{entry.points}</div>
                <div className="text-xs text-muted-foreground">points</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Rank</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead className="text-center">Matches</TableHead>
              <TableHead className="text-center">Points</TableHead>
              <TableHead className="text-right w-[100px]">Movement</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard.map((entry) => (
              <TableRow key={entry.team} className={entry.rank <= 3 ? "bg-muted/30" : ""}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    {entry.rank <= 3 && <Trophy className={`h-5 w-5 mr-1 ${entry.rank === 1 ? "text-yellow-500" : entry.rank === 2 ? "text-gray-400" : "text-amber-700"}`} />}
                    {entry.rank}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className={`h-8 w-8 ${getAvatarColor(entry.team)}`}>
                      <AvatarFallback>{getInitials(entry.team)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{entry.team.split(" (")[0]}</span>
                  </div>
                </TableCell>
                <TableCell>{entry.owner}</TableCell>
                <TableCell className="text-center">{entry.matchesPlayed}</TableCell>
                <TableCell className="text-center font-bold">{entry.points}</TableCell>
                <TableCell className="text-right">{getRankChange(entry.rank, entry.previousRank)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
