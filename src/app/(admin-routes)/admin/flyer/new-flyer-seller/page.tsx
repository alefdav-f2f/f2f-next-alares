"use client";
import axiosInterceptorInstance from "@/app/api/axiosInterceptor";
import TitlePage from "@/app/components/TitlePage";
import { RiImageEditFill } from "react-icons/ri";
import { MdOutlineFileUpload } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FieldError, useForm } from "react-hook-form";

export default function FlyerSeller() {
    const router = useRouter();
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
    const [storyImage, setStoryImage] = useState('');
    const [feedImage, setFeedImage] = useState('');
    const [selectedFileFeed, setSelectedFileFeed] = useState<string | ArrayBuffer | null>(null);
    const [selectedFileStory, setSelectedFileStory] = useState<string | ArrayBuffer | null>(null);



    const handlerImageFeed = (event: any) => {
        const input = event.target;
        const file = input.files[0];
        const reader = new FileReader();

        setFeedImage(file);

        reader.onload = () => {
            setSelectedFileFeed(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handlerImageStory = (event: any) => {
        const input = event.target;
        const file = input.files[0];
        const reader = new FileReader();

        setStoryImage(file);

        reader.onload = () => {
            setSelectedFileStory(reader.result);
        };
        reader.readAsDataURL(file);
    };



    const storeFlyer = async (flyerData: any) => {
        try {
            const formData = new FormData();
            formData.append('name', flyerData.name.toLowerCase());
            formData.append('isActive', flyerData.isActive);
            formData.append('isTradeMarketing', flyerData.isTradeMarketing);
            formData.append('storyImage', storyImage);
            formData.append('feedImage', feedImage);


            await axiosInterceptorInstance.post('/flyer/create', formData);
            router.push('/admin/flyer');
            toast.success('Flyer criado com sucesso');
        } catch (error: any) {
            toast.error(error.response?.data?.message);
        }
    }





    return (
        <div className="p-4">
            <div className="mb-6 flex justify-between items-center">
                <TitlePage icon={<RiImageEditFill />} title="Flyer" />
                <button onClick={() => router.push('/admin/flyer')} className="text-black bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                    Voltar
                </button>
            </div>
            <section className="mt-10">
                <h1 className="border-b-2 mb-4">Cadastrar Flyer</h1>
                <form onSubmit={handleSubmit(storeFlyer)}>
                    <div className="flex flex-wrap">
                        <div className="flex pr-4 w-full gap-2">
                            <div className="flex flex-col">
                                <label className="flex ">Titulo</label>
                                <input
                                    type="text"
                                    placeholder="Digite o nome"
                                    {...register('name', { required: 'Este campo é obrigatório' })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 mb-4"
                                />
                                {errors.name && (
                                    <span className="text-red-600 text-sm">
                                        {(errors.name as FieldError).message}
                                    </span>
                                )}

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
                            Cadastrar Flyer
                        </button>
                    </div>
                </form>


            </section>

        </div>

    );
}
