import { getServiceCategories } from "@/lib/api/services";
import ServiceCategoriesClient from "./ServiceCategoriesClient";


const ServiceCategories = async () => {

  const categories = await getServiceCategories();


  return (
    <ServiceCategoriesClient categories={categories}/>
  );

};


export default ServiceCategories;