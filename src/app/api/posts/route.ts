import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch(
            'https://alaresinternet.com.br/indoalem/wp-json/custom/v1/posts/category/alares-em-foco?per_page=4',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                },
                next: {
                    revalidate: 3600 // revalidar cache a cada 1 hora
                }

            }
        );

        if (!response.ok) {
            throw new Error('Falha ao buscar dados');
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        return NextResponse.json(
            { error: 'Erro ao buscar posts' },
            { status: 500 }
        );
    }
}