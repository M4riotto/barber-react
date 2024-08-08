import Search from "../_components/search";
import BarbershopItem from "../_components/ui/barbershop-items";
import Header from "../_components/ui/header";
import { db } from "../_lib/prisma";

interface BarbershopPageProps {
    searchParams: {
        title?: string;
        service?: string;
    }
}

const BarbershopPage = async ({ searchParams }: BarbershopPageProps) => {
    const Barbershop = await db.barbershop.findMany({
        where: {
            OR: [
                searchParams?.title ? {
                    name: {
                        contains: searchParams?.title,
                        mode: "insensitive",
                    },
                } : {},
                searchParams?.service ? {
                    services: {
                        some: {
                            name: {
                                contains: searchParams?.service,
                                mode: "insensitive",
                            },
                        },
                    },
                }: {},
           ],
        }
    })
    return (
        <div>
            <Header />
            <div className="my-6 px-5">
                <Search />
            </div>
            <div className="px-5">
                <h2 className="uppercase text-gray-400 font-bold text-xs mt-6 mb-6">Resultados para &quot;{searchParams.title || searchParams?.service}&quot;</h2>
                <div className="grid grid-cols-2 gap-4">
                    {Barbershop.map(barbershop => <BarbershopItem key={barbershop.id} barbershop={barbershop} />)}
                </div>
            </div>
        </div>
    );
}

export default BarbershopPage;