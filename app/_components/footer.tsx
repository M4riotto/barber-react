import { Card, CardContent } from "./ui/card";

const Footer = () => {
    return ( 
        <footer>
          <Card className="px-5 pt-6">
            <CardContent>
              <p className="text-sm text-gray-400">
                2023 Copyright <span className="font-bold">VGM Barber</span>
              </p>
            </CardContent>
          </Card>
        </footer>
     );
}
 
export default Footer;