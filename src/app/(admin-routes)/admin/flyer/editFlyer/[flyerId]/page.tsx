"use client";
import axiosInterceptorInstance from "@/app/api/axiosInterceptor";
import TitlePage from "@/app/components/TitlePage";
import { RiImageEditFill } from "react-icons/ri";
import { MdOutlineFileUpload } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function FlyerSellerEdit({ params }: { params: { flyerId: string } }) {
    const flyerId = params.flyerId;

    const router = useRouter();
    const { register, handleSubmit, setValue } = useForm();
    const [storyImage, setStoryImage] = useState('');
    const [feedImage, setFeedImage] = useState('');
    const [selectedFileFeed, setSelectedFileFeed] = useState<string | ArrayBuffer | null>(null);
    const [selectedFileStory, setSelectedFileStory] = useState<string | ArrayBuffer | null>(null);
    const [changedStory, setChangedStory] = useState(false);
    const [changedFeed, setChangedFeed] = useState(false);
    useEffect(() => {
        console.log("Flyer ID:", flyerId); // Verifique se o ID está correto
        if (flyerId) {
            getFlyerDetails(flyerId);
        }
    }, [flyerId]);


    const handlerImageFeed = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        setFeedImage(file);
        setChangedFeed(true);

        reader.onload = () => {
            setSelectedFileFeed(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handlerImageStory = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        setStoryImage(file);
        setChangedStory(true);

        reader.onload = () => {
            setSelectedFileStory(reader.result);
        };
        reader.readAsDataURL(file);
    };

 

    const updateFlyer = async (flyerData: any) => {
        try {
            const formData = new FormData();
            formData.append("name", flyerData.name.toLowerCase());
            formData.append("isActive", flyerData.isActive);
            formData.append("id", flyerId);
            formData.append("feedImage", feedImage);
            formData.append("storyImage", storyImage);
            formData.append('changed', String(changedStory));
            formData.append('changedMobile', String(changedFeed));


            await axiosInterceptorInstance.patch("/flyer/update", formData);
            toast.success("Flyer atualizado com sucesso");

            router.push("/admin/flyer");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Erro ao atualizar o flyer");
        }
    };

    const getFlyerDetails = async (id: string) => {

        try {
            const response = await axiosInterceptorInstance.get(`/flyer/detail/${id}`);
            const data = response.data;

            setValue("name", data.name);
            setValue("isActive", String(data.isActive));
            setValue("isTradeMarketing", String(data.isTradeMarketing));
            setSelectedFileFeed(data.feed);
            setSelectedFileStory(data.story);
        } catch (error: any) {
            toast.error("Erro ao buscar detalhes do flyer");
        }
    };

    return (
        <div className="p-4">
            <div className="mb-6 flex justify-between items-center">
                <TitlePage icon={<RiImageEditFill />} title="Flyer" />
                <button onClick={() => router.push('/admin/flyer')} className="text-black bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                    Voltar
                </button>
            </div>
            <section className="mt-10">
                <h1 className="border-b-2 mb-4">Editar Flyer</h1>
                <form onSubmit={handleSubmit(updateFlyer)}>
                    <div className="flex flex-wrap">
                        <div className="flex pr-4 w-full gap-2">
                            <div className="flex flex-col">
                                <label className="flex">Título</label>
                                <input
                                    type="text"
                                    placeholder="Digite o nome"
                                    {...register('name')}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 mb-4"
                                />
                            </div>

                            <div className='sm:w-52 flex flex-col'>
                                <label htmlFor="status" className="block mb-1 text-sm font-medium text-gray-900">Status</label>
                                <select
                                    id="status"
                                    {...register('isActive')}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    <option value="true">Ativo</option>
                                    <option value="false">Inativo</option>
                                </select>
                            </div>
                            <div className='sm:w-52 flex flex-col'>
                                <label htmlFor="status" className="block mb-1 text-sm font-medium text-gray-900">Categoria</label>
                                <select
                                    id="status"
                                    {...register('isTradeMarketing')} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    <option value="false">Normal</option>
                                    <option value="true">Ação Trade Marketing</option>
                                    
                                </select>
                            </div>
                        </div>
                        <section className="flex flex-wrap gap-2">
                            <div className="w-full mt-5 mb-5">
                                <h1 className="text-lg">Realize o upload das imagens*</h1>
                            </div>
                            <div className='mb-6'>

                                <label className="block mb-1 text-sm font-medium">Imagem Feed</label>
                                <input onChange={handlerImageFeed} className="block w-full text-sm text-gray-900 border mb-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" id="file_input" type="file" />

                                <div className='mb-1'>
                                    <img src={selectedFileFeed as string} alt="" className='max-h-52' />
                                </div>
                            </div>

                            <div className='mb-6'>

                                <label className="block mb-1 text-sm font-medium">Imagem Story</label>
                                <input onChange={handlerImageStory} className="block w-full text-sm text-gray-900 border mb-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" id="file_input" type="file" />

                                <div className='mb-1'>
                                    <img src={selectedFileStory as string} alt="" className='max-h-52' />
                                </div>
                            </div>

                          
                       
                        </section>
                    </div>

                    <div className="flex mt-7">
                        <button type="submit" className="text-white bg-main mr-4 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                            Atualizar Flyer
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}
