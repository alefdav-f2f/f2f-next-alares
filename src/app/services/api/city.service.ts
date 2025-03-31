import axiosInterceptorInstance from "@/app/api/axiosInterceptor";
import { CityProps } from "@/app/types/interface/state.interface";

const CityService = {
    async getAllCities(): Promise<CityProps[]> {
        try {
            const statesRequest = await axiosInterceptorInstance.get(
                "/uf/paginate-without-auth",
                {
                    params: {
                        isActive: true,
                        page: 1,
                        perPage: 99999,
                    },
                }
            );

            if (statesRequest.status === 200) {
                const states = statesRequest.data?.data;
                let cities: CityProps[] = [];

                for (const state of states) {
                    const citiesRequest = await axiosInterceptorInstance.get(
                        `/city/get-by-uf-without-auth`,
                        {
                            params: {
                                id: state.id,
                                isActive: true,
                            },
                        }
                    );

                    if (citiesRequest.status === 200) {
                        const citiesData = citiesRequest.data as CityProps[];
                        cities = [...cities, ...citiesData];
                    }
                }

                cities.forEach((city) => {
                    city.value = city.name.toLowerCase();
                });

                return cities;
            }
            return [];
        } catch (error) {
            console.error("Erro ao carregar cidades:", error);
            return [];
        }
    },

    async searchCities(searchTerm: string, cities: CityProps[]): Promise<CityProps[]> {
        return cities.filter(city => 
            city.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
};

export default CityService; 