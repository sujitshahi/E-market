import {Card, CardHeader, CardBody, Image} from "@heroui/react";
import { use } from "react";


export default function Page() {

  return (
    <div className=" grid grid-cols-4 gap-4 p-4 m-4 justify-center font-bold">
        <div className="border-2 rounded-lg w-[300px]">
            <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-2xl textuppercase font-bold">Shoes</p>
                    <small className="font-bold text-3xl">Brand: Nike</small>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image alt="Card background" className="object-cover rounded-xl"
                        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D"
                        width={270}
                    />
                </CardBody>
            </Card>
        </div>

        <div className=" border-2 rounded-lg w-[300px]">
            <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="uppercase text-2xl">watches</p>
                    <small className=" text-3xl">Brand: Rolex</small>
                  
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0Y2hlc3xlbnwwfHwwfHx8MA%3D%3D"
                    width={270}
                    />
                </CardBody>
            </Card>
        </div>

        <div className="border-2 rounded-lg w-[300px]">
            <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="uppercase text-2xl">jeans</p>
                    <small className="text-3xl">Brand: Funky Denim</small>
                    
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGplYW5zfGVufDB8fDB8fHww"
                    width={270}
                    />
                </CardBody>
            </Card>
        </div>

        <div className="border-2 rounded-lg w-[300px]">
            <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="uppercase text-2xl">Daily Mix</p>
                    <small className="text-3xl">12 Tracks</small>
                    
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="https://plus.unsplash.com/premium_photo-1679079456083-9f288e224e96?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D"
                    width={270}
                    />
                </CardBody>
            </Card>
        </div>
    </div>

    
  );
}
