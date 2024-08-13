

import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/app/_components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle, CardContent } from "@/app/_components/ui/card"
import SideBar from "../_components/SideBar"
import Client from "../_components/Client"
import Orders from "../_components/orders"
import Image from "next/image"
import { ActivitySquareIcon, CreditCard, DollarSign } from "lucide-react"

const Dashboard = () =>  {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <SideBar />
                    <div className="relative ml-auto flex-1 md:grow-0">
                        {/* <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /> */}
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full relative rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                                <Image
                                    src="/placeholder-user.jpg"
                                    width={36}
                                    height={36}
                                    alt="Avatar"
                                    className="overflow-hidden rounded-full"
                                    style={{ aspectRatio: "36/36", objectFit: "cover" }}
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Total </CardTitle>
                                <DollarSign className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$45,231.89</div>
                                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                            </CardContent>
                        </Card>
                        <Client />
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                                <CreditCard className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+12,234</div>
                                <p className="text-xs text-muted-foreground">+19% from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                                <ActivitySquareIcon className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+573</div>
                                <p className="text-xs text-muted-foreground">+201 since last hour</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                        <Orders />
                        <Card />
                    </div>
                </main>
            </div>
        </div>
    )
}


export default Dashboard;