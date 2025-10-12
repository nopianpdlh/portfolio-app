import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { getSkillsByCategory } from "@/lib/actions/skills"
import SkillsManager from "@/components/admin/SkillsManager"

export default async function SkillsPage() {
  const groupedSkills = await getSkillsByCategory()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="text-gray-600 mt-1">Manage your technical skills and expertise</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Skills Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <SkillsManager initialSkills={groupedSkills} />
        </CardContent>
      </Card>
    </div>
  )
}
