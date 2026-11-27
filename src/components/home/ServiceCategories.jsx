import { getServiceCategories } from "@/lib/api/services";
import ServiceCategoriesClient from "./ServiceCategoriesClient";


const ServiceCategories = async () => {

  const categories = await getServiceCategories();
  console.log(categories);


  return (
    <ServiceCategoriesClient categories={categories}/>
  );

};


export default ServiceCategories;