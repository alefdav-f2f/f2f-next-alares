'use client'
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import DatePTBR from '@/app/resource/date.service';
import SystemService from '@/app/services/api/system.service'
import React, { useState } from 'react'

export default function page() {

    const [reportList, setReportList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getReport() {

        setIsLoading(true)

        const response = await SystemService.getReport();

        const data = response?.data?.data;

        setReportList(data);
        setIsLoading(false)
    }

    React.useEffect(() => {
        getReport();
    }, [])

    return (
        <>
            {isLoading ? (
                <div className='h-[500px] flex justify-center items-center'>
                    <LoadingAlares />
                </div>
            ) : (
                <div className='p-10'>
                    {reportList?.map((report: any) => {
                        return (
                            <div className='mb-3 text-sm border-b border-gray-100'>
                                <div className='text-xs flex'>
                                    <div className='mr-2'>
                                        <span>{<DatePTBR date={report.createdAt} />}</span>
                                    </div>

                                    <div className='mr-2'>
                                        <span>{report.path}</span>
                                    </div>
                                </div>
                                <div className='mr-2'>
                                    <span className='text-orange-500 text-xs'>{report.text_error}</span>
                                </div>
                            </div>
                        )
                    })}
                </div >
            )
            }
        </>
    )
}
