import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getSettings } from "@/lib/actions/settings"
import SettingsForm from "@/components/admin/forms/SettingsForm"
import StatusStatsForm from "@/components/admin/forms/StatusStatsForm"

export default async function SettingsPage() {
  const settings = await getSettings()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your site and profile settings</p>
      </div>

      <Tabs defaultValue="site" className="space-y-6">
        <TabsList>
          <TabsTrigger value="site">Site Information</TabsTrigger>
          <TabsTrigger value="status">Status & Quick Stats</TabsTrigger>
        </TabsList>

        {/* Site Settings Tab */}
        <TabsContent value="site">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
              <CardDescription>Basic information about your portfolio site</CardDescription>
            </CardHeader>
            <CardContent>
              <SettingsForm settings={settings} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Status & Stats Tab */}
        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardTitle>Status & Quick Stats</CardTitle>
              <CardDescription>
                Manage your availability status, current activity, and custom statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StatusStatsForm settings={settings} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
