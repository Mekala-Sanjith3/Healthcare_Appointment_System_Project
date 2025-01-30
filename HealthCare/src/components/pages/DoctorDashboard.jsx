import React, { useState } from "react"
import { Calendar, Clock, FileText, History, Users, Search, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/table"
import { Button } from "../../components/button"
import { Input } from "../../components/input"
import { Label } from "../../components/label"
import { Switch } from "../../components/switch"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import "../../styles/css-pages/DoctorDashboard.css"

function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("appointments")
  const [date, setDate] = useState(new Date())

  // Sample data (you would typically fetch this from an API)
  const appointments = [
    { id: 1, patientName: "John Doe", time: "09:00 AM", type: "Check-up", status: "Confirmed" },
    { id: 2, patientName: "Jane Smith", time: "10:30 AM", type: "Follow-up", status: "Pending" },
  ]

  const patientHistory = [
    {
      id: 1,
      patientName: "John Doe",
      lastVisit: "2024-01-15",
      diagnosis: "Common Cold",
      treatment: "Prescribed antibiotics",
    },
    { id: 2, patientName: "Jane Smith", lastVisit: "2024-01-10", diagnosis: "Migraine", treatment: "Pain medication" },
  ]

  const aiData = [
    { time: "9 AM", patients: 4, efficiency: 85 },
    { time: "10 AM", patients: 6, efficiency: 90 },
    { time: "11 AM", patients: 8, efficiency: 95 },
    { time: "12 PM", patients: 4, efficiency: 80 },
    { time: "1 PM", patients: 2, efficiency: 75 },
    { time: "2 PM", patients: 5, efficiency: 85 },
    { time: "3 PM", patients: 7, efficiency: 90 },
    { time: "4 PM", patients: 3, efficiency: 80 },
  ]

  const reports = [
    { id: 1, patientName: "John Doe", reportType: "Blood Test", date: "2024-01-20", status: "Pending" },
    { id: 2, patientName: "Jane Smith", reportType: "X-Ray", date: "2024-01-19", status: "Completed" },
  ]

  return (
    <div className="flex min-h-screen flex-col space-y-6 p-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#1A76D1]">Doctor Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Dr. Sarah Wilson</span>
          <div className="h-10 w-10 rounded-full bg-[#1A76D1] text-white flex items-center justify-center">SW</div>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-[#1A76D1]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Hours</CardTitle>
            <Clock className="h-4 w-4 text-[#1A76D1]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.5</div>
            <p className="text-xs text-muted-foreground">Hours remaining today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-[#1A76D1]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">Lifetime</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports Due</CardTitle>
            <FileText className="h-4 w-4 text-[#1A76D1]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Pending reports</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-white">
          <TabsTrigger value="appointments" className="data-[state=active]:bg-[#1A76D1] data-[state=active]:text-white">
            Appointments
          </TabsTrigger>
          <TabsTrigger value="availability" className="data-[state=active]:bg-[#1A76D1] data-[state=active]:text-white">
            Availability
          </TabsTrigger>
          <TabsTrigger
            value="patient-history"
            className="data-[state=active]:bg-[#1A76D1] data-[state=active]:text-white"
          >
            Patient History
          </TabsTrigger>
          <TabsTrigger
            value="ai-availability"
            className="data-[state=active]:bg-[#1A76D1] data-[state=active]:text-white"
          >
            AI Availability
          </TabsTrigger>
          <TabsTrigger
            value="patient-report"
            className="data-[state=active]:bg-[#1A76D1] data-[state=active]:text-white"
          >
            Patient Report
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="border rounded-lg p-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#1A76D1]">Today's Appointments</h2>
              <Button variant="outline">Export Schedule</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.patientName}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.type}</TableCell>
                    <TableCell>{appointment.status}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="availability" className="border rounded-lg p-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1A76D1]">Set Availability</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Placeholder for Calendar component */}
                <div className="bg-gray-200 h-64 rounded-md flex items-center justify-center">Calendar Component</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1A76D1]">Working Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                  <div key={day} className="flex items-center justify-between">
                    <Label htmlFor={day}>{day}</Label>
                    <div className="flex items-center space-x-4">
                      <Switch id={day} />
                      <span className="text-sm text-gray-500">9:00 AM - 5:00 PM</span>
                    </div>
                  </div>
                ))}
                <Button className="w-full mt-4 bg-[#1A76D1]">Save Changes</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patient-history" className="border rounded-lg p-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search patients..." className="pl-8" />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Diagnosis</TableHead>
                  <TableHead>Treatment</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientHistory.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.patientName}</TableCell>
                    <TableCell>{record.lastVisit}</TableCell>
                    <TableCell>{record.diagnosis}</TableCell>
                    <TableCell>{record.treatment}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        View Full History
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="ai-availability" className="border rounded-lg p-4">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#1A76D1]">AI-Powered Scheduling Insights</h2>
              <Button variant="outline">Generate Report</Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1A76D1]">Patient Flow Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={aiData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="patients" stroke="#1A76D1" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1A76D1]">Efficiency Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={aiData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="efficiency" stroke="#1A76D1" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="patient-report" className="border rounded-lg p-4">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#1A76D1]">Patient Reports</h2>
              <Button variant="outline">Create New Report</Button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
                  <FileText className="h-4 w-4 text-[#1A76D1]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
                  <FileText className="h-4 w-4 text-[#1A76D1]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                  <FileText className="h-4 w-4 text-[#1A76D1]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">145</div>
                </CardContent>
              </Card>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Report Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.patientName}</TableCell>
                    <TableCell>{report.reportType}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{report.status}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DoctorDashboard