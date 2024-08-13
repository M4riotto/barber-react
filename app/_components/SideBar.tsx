import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/app/_components/ui/tooltip"
import { ArrowRight, BarChartIcon, ClipboardIcon, LayoutGridIcon, MenuIcon, Package2Icon, PackageIcon, SettingsIcon, UsersIcon } from "lucide-react";
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";

const SideBar = () => {
    return (
        <>
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                    <TooltipProvider>
                        <Link
                            href="#"
                            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                            prefetch={false}
                        >
                            <Package2Icon className="h-4 w-4 transition-all group-hover:scale-110" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/dashboard"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                    prefetch={false}
                                >
                                    <LayoutGridIcon className="h-5 w-5" />
                                    <span className="sr-only">Dashboard</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Dashboard</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/dashboard/orders"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                    prefetch={false}
                                >
                                    <ClipboardIcon className="h-5 w-5" />
                                    <span className="sr-only">Orders</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Orders</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/dashboard/products"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                    prefetch={false}
                                >
                                    <PackageIcon className="h-5 w-5" />
                                    <span className="sr-only">Products</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Products</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                    prefetch={false}
                                >
                                    <UsersIcon className="h-5 w-5" />
                                    <span className="sr-only">Customers</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Customers</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                    prefetch={false}
                                >
                                    <BarChartIcon className="h-5 w-5" />
                                    <span className="sr-only">Analytics</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Analytics</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                    prefetch={false}
                                >
                                    <SettingsIcon className="h-5 w-5" />
                                    <span className="sr-only">Settings</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Settings</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
            </aside>

            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" >
                        <MenuIcon className="h-5 w-5 sm:hidden" />
                        <ArrowRight className="h-5 w-5 hidden sm:block" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                            prefetch={false}
                        >
                            <Package2Icon className="h-5 w-5 transition-all group-hover:scale-110" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        <Link href="/dashboard" className="flex items-center gap-4 px-2.5 text-foreground" prefetch={false}>
                            <LayoutGridIcon className="h-5 w-5" />
                            Dashboard
                        </Link>
                        <Link
                            href="/dashboard/orders"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            prefetch={false}
                        >
                            <ClipboardIcon className="h-5 w-5" />
                            Orders
                        </Link>
                        <Link
                            href="/dashboard/products"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            prefetch={false}
                        >
                            <PackageIcon className="h-5 w-5" />
                            Products
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            prefetch={false}
                        >
                            <UsersIcon className="h-5 w-5" />
                            Customers
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            prefetch={false}
                        >
                            <BarChartIcon className="h-5 w-5" />
                            Analytics
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            prefetch={false}
                        >
                            <SettingsIcon className="h-5 w-5" />
                            Settings
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
        </>
    );
}

export default SideBar;