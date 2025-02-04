'use client'
import PageTitle from '@/app/components/PageTitle';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import icon from '@/img/icon/icon-politica.png';
import banner from '@/img/banners/Banners_PoliticaPrivacidade_V8.png';
import bannerMobile from '@/img/banners/Banners_Mobile_politicaPrivacidade_V5.png';
import Image from 'next/image';
import Footer from '@/app/components/Footer';
import Logo from '@/app/components/Logo/Logo';

export default function PolicyPage() {

    const searchParams = useSearchParams();
    const router = useRouter();

    async function navigate(path: string, external: boolean) {

        const current = new URLSearchParams(Array.from(searchParams.entries()));

        if (external) {
            window.open(path, '_blank')
        } else {
            router.push(`${path}/?${current}`)
        }
    }


    const navigationList = [
        {
            type: 'Política de privacidade',
            buttons: [
                { name: 'INTRODUÇÃO', id: 'introducao' },
                { name: 'COMO COLETAMOS SEUS DADOS PESSOAIS E PARA QUAIS FINALIDADES', id: 'como' },
                { name: 'COMPARTILHAMENTO DE DADOS PESSOAIS', id: 'compartilhamento' },
                { name: 'TRANSFERÊNCIA INTERNACIONAL DE DADOS PESSOAIS', id: 'transferencia' },
                { name: 'DECISÕES AUTOMATIZADAS, SEGMENTAÇÃO E PROFILING', id: 'decisoes' },
                { name: 'OS DIREITOS DO TITULAR DE DADOS', id: 'direitos' },
                { name: 'RETENÇÃO DOS DADOS PESSOAIS', id: 'retencao' },
                { name: 'SEGURANÇA DOS SEUS DADOS PELA ALARES', id: 'seguranca' },
            ]
        },
        {
            type: 'Política de Cookies',
            buttons: [
                { name: 'COOKIES', id: 'cookies' },
                { name: 'O QUE SÃO COOKIES?', id: 'que' },
                { name: 'PARA QUE SERVEM OS COOKIES?', id: 'para' },
                { name: 'CATEGORIAS DE COOKIES', id: 'categorias' },
                { name: 'QUE TIPOS DE COOKIES UTILIZAMOS?', id: 'tipo' },
                { name: 'CONTATO', id: 'contato' },
            ]
        }
    ]

    return (
        <section className='scroll-smooth'>
            <nav className="h-[90px] sm:h-[160px] max-w-screen">
                <div className="flex justify-center items-center sm:relative h-[90px] bg-main w-[100%] border-secondary border-b-[5px]">

                    <div className="flex items-center justify-center sm:w-[1200px] w-full px-5">
                        <button className="hover:bg-hover rounded-md py-2 px-4" onClick={() => { navigate('/', false) }}>
                            <Logo className="w-28 sm:w-36 sm:mr-8" color="white" />
                        </button>

                        <div className="flex sm:hidden"></div>
                    </div>
                </div>
            </nav>

            <PageTitle icon={icon} title='Política de Privacidade e Cookies' />

            <div className='mb-10'>
                <Image src={banner} alt={''} className='hidden sm:flex' />
                <Image src={bannerMobile} alt={''} className='sm:hidden flex' />
            </div>

            <div className='flex justify-center p-4 mb-10'>
                <div className='flex flex-wrap w-[1200px]'>
                    <div className='w-[300px] pr-8 mb-10 border-r-2 border-secondary mr-6'>
                        {navigationList?.map((nav, index) => {
                            return (
                                <div key={index}>
                                    <div className='mb-4 text-center text-main'>
                                        <span>{nav.type}</span>
                                    </div>
                                    <div>
                                        {nav?.buttons?.map((button, index2) => {
                                            return (
                                                <div className='mb-4'>
                                                    <a rel="canonical" href={`#${button.id}`}>
                                                        <button className='border-2 border-secondary rounded-3xl p-2 w-full text-main font-light text-sm'>
                                                            {button.name}
                                                        </button>
                                                    </a>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                    <div className='sm:w-[800px]'>

                        <div className='pb-4 border-b-2 border-secondary w-full mb-4'>
                            <span className='text-3xl text-main'>POLÍTICAS DE PRIVACIDADE</span>
                        </div>

                        <div id='introducao'>
                            <div className='mb-2'>
                                <span className='text-2xl text-sub font-light'>INTRODUÇÃO</span>
                            </div>
                            <div className='text-main text-justify font-light'>
                                <div className='mb-4'>
                                    <span>A <strong>Alares</strong> (“Nós”) se preocupa em zelar por sua privacidade e em proteger seus dados pessoais de modo transparente, seguro e ético.</span>
                                </div>
                                <div className='mb-4'>
                                    <span>Por meio deste documento (“Política” ou “Política de Privacidade”), buscamos esclarecer de forma clara e com informações completas como seus dados pessoais (“Titular” ou “Você”) são coletados e por quais razões, com quem eles são compartilhados, quais medidas utilizamos para mantê-los seguros e como Você poderá entrar em contato conosco em caso de dúvidas ou solicitações.</span>
                                </div>
                                <div className='mb-4'>
                                    <span>Esta Política se aplica a todos que tenham, de alguma forma, dados pessoais sob responsabilidade da Alares, que poderá atuar como Controladora quando Você acessa nossas plataformas, aplicações eletrônicas ou utiliza de forma particular nossos serviços.</span>
                                </div>
                                <div className='mb-4'>
                                    <span>Será aplicável também quando atuarmos na cadeia de serviços de algum parceiro, momento em que poderemos ser considerada como Operadora de dados pessoais.</span>
                                </div>
                                <div className='mb-4'>
                                    <span>Recomendamos que Você leia atentamente este documento. Caso Você tenha qualquer dúvida ou solicitação, sinta-se à vontade para entrar em contato com nosso Encarregado por meio do canal indicado no item <strong>“ENTRE EM CONTATO CONOSCO”</strong>.</span>
                                </div>
                            </div>
                        </div>

                        <div id="como">
                            <div className='mb-2'>
                                <span className='text-2xl text-sub font-light'>COMO COLETAMOS SEUS DADOS PESSOAIS E PARA QUAIS FINALIDADES</span>
                            </div>
                            <div className='text-main text-justify font-light'>
                                <div className='mb-4'>
                                    <span><strong>COMO COLETAMOS SEUS DADOS PESSOAIS</strong></span>
                                </div>
                                <div className='mb-4'>
                                    <span>Existem quatro formas de coleta de informações a seu respeito quando Você acessa ou utiliza um site ou aplicativo de qualquer empresa da Alares, ou quando contrata e utiliza serviços ofertados por Nós.</span>
                                </div>
                                <div className='mb-4'>
                                    <span><strong>A.</strong> Informações que Você fornece voluntariamente para saber mais sobre nossos produtos e serviços</span>
                                </div>
                                <div className='mb-4'>
                                    <span>Acontecem por meio de formulários digitais oufísicos, bem como por ligações telefônicas ou quando acessar nossos sites, canais de comunicação ou ferramentas, “softwares” (programas de computador) ou aplicações.</span>
                                </div>

                                <div className='mb-4'>
                                    <span><strong>B.</strong> Dados coletados de forma automática quando Você utiliza nossos serviços</span>
                                </div>
                                <div className='mb-4'>
                                    <span><strong>Dados de tráfego:</strong> informações sobre chamadas realizadas e recebidas, envio de SMS, volume de dados utilizados e antenas que foram utilizadas durante o serviço. Esse conjunto de informações é indispensável para a continua avaliação da qualidade e gestão administrativa-financeira dos serviços prestados.</span>
                                </div>
                                <div className='mb-4'>
                                    <span><strong>C.</strong> Informações recebidas ou coletadas de terceiros</span>
                                </div>
                                <div className='mb-4'>
                                    <span>Nas campanhas realizadas com os clientes, a Alares somente utiliza as informações de clientes que possuem relacionamento com a instituição para enviar comunicações e premiações. No mais, informamos que em integrações de sistemas de parceiros, os dados são criptografados, ou agregados de forma que não seja possível identificar os clientes. Além disso, informamos que não recebemos ou compartilhamos dados de clientes com terceiros.</span>
                                </div>
                                <div className='mb-4'>
                                    <span><strong>D.</strong> Dados pessoais de fontes disponíveis publicamente</span>
                                </div>
                                <div className='mb-4'>
                                    <span>Além dos dados fornecidos por Você ou obtidos automaticamente, a <strong>Alares</strong> também poderá ter acesso aos dados que por qualquer motivo foram tornados públicos pelos seus titulares.
                                        No mais, também podemos receber informações por meio de: redes sociais de terceiros, como Facebook e Instagram; parceiros; aplicativos móveis para smartphones; durante ações de relacionamento com nosso público; por registros de interações disponibilizadas por e-mail e seus conteúdos compartilhados; por registros de contatos realizados em nossos sites, aplicações e plataformas de comunicação e relacionamento e registro de compartilhamento de conteúdo nas redes sociais oficiais da empresa.</span>
                                </div>

                                <div className='mb-4'>
                                    <span><strong>QUAIS DADOS PESSOAIS TRATAMOS</strong></span>
                                </div>

                                <div className='pl-5 mb-4'>
                                    <ul className='list-disc'>
                                        <li><span className='underline'>Atributos biográficos:</span> dados da pessoa natural tais como nome civil ou social, data do nascimento, filiação, naturalidade, nacionalidade, sexo, endereço, endereços de correio eletrônico, números de telefone;</li>
                                        <li><span className='underline'>Dados cadastrais:</span> informações identificadoras perante o cadastro de órgãos públicos tais como: número de inscrição no Cadastro de Pessoas Físicas – CPF, número de Identificação Social – NIS, número de inscrição no Programa de Integração Social – PIS, número de inscrição no Programa de Formação do Patrimônio do Servidor Público – Pasep, número do Título de Eleitor; número da Carteira Nacional de Habilitação – CNH; número da Cédula de Identidade etc.;</li>
                                        <li><span className='underline'>Dados bancários e de pagamento:</span>Informações relacionadas aos meios que Você utiliza para pagar nossos serviços tais como Banco, agência e números de contas bancárias, números de cartões de crédito e débito;</li>
                                        <li><span className='underline'>Reclamações à Alares:</span> Protocolos com a reclamação de forma que a Alares possa atuar junto visando o processamento da reclamação;</li>
                                        <li><span className='underline'>Dados de voz:</span> Informações relacionadas as gravações de voz durante chamadas para nossas centrais de atendimento. Ressaltamos que não realizamos atividades de reconhecimento de voz;</li>
                                        <li><span className='underline'>Dados de localização:</span> Informações de geolocalização obtidas durante a prestação dos serviços e apoiam a mensuração e melhoria de qualidade dos serviços;</li>
                                        <li><span className='underline'>Dados coletados automaticamente: </span> Características do dispositivo de acesso, do navegador, IP (com data e hora), localização, origem do IP, informações sobre cliques, páginas acessadas, a página seguinte acessada após a saída das Páginas, ou qualquer termo de procura digitado nos sites ou em referência a estes, dentre outros. Para tal coleta, a Alares fará uso de algumas tecnologias padrões, como cookies, pixel tags, entre outros, que são utilizadas com o propósito de melhorar a experiência de navegação do usuário, de acordo com seus hábitos e suas preferências. É importante esclarecer que, com o advento do desenvolvimento tecnológico, no intuito de viabilizar a prestação dos serviços contratados com o mínimo de segurança, poderá ser coletado, com o consentimento do usuário, atributos biométricos, isto é, características biológicas e comportamentais mensuráveis da pessoa natural que podem ser coletadas para reconhecimento automatizado.</li>
                                    </ul>
                                </div>

                                <div className='mb-4'>
                                    <span><strong>POR QUAIS RAZÕES TRATAMOS SEUS DADOS PESSOAIS</strong></span>
                                </div>

                                <div className='mb-4'>
                                    <span>Seus dados pessoais poderão ser utilizados pela <strong>Alares</strong> para as seguintes finalidades:</span>
                                </div>

                                <div className='pl-5 mb-4'>
                                    <ul className='list-disc'>
                                        <li><span className='underline'>Cumprimento das obrigações contratuais, legais e regulatórias;</span></li>
                                        <li><span className='underline'>Para contratação e execução de serviços contratados;</span></li>
                                        <li><span className='underline'>Tratamento de reclamações e/ou de denúncias,</span>bem como para manter os usuários dos serviços de telecomunicações informados sobre o seu andamento;</li>
                                        <li><span className='underline'>Viabilizar as ações de fiscalização de órgãos e autoridades administrativas,</span>incluindo toda atividade de acesso, obtenção e averiguação de dados e informações, por meio de procedimentos e técnicas aplicados por Agente de Fiscalização com a finalidade de reunir evidências para a apuração do cumprimento de obrigações e conformidades por parte da fiscalizada e verificar a forma de execução dos serviços de telecomunicações;</li>
                                        <li><span className='underline'>Viabilizar o atendimento quanto às dúvidas, sugestões, reclamações ou pedidos</span>realizados pelos Usuários e/ou Clientes dos serviços de telecomunicações e de outros serviços prestados pela Alares;</li>
                                        <li><span className='underline'>Para processar os pagamentos dos preços dos produtos e serviços contratados</span>pelos clientes e prestadores da Alares.</li>
                                    </ul>
                                </div>

                                <div className='mb-4'>
                                    <span>Por fim, vale mencionar que, de acordo com nossa legislação, qualquer compra, aceite, consentimento ou outro ato jurídico que Você venha a realizar só será considerado válido se Você tiver capacidade legal para exercê-lo. A Alares não permite que menores de idade efetuem compras ou se envolvam em outros atos legais, sem autorização de seus responsáveis.</span>
                                </div>
                            </div>
                        </div>

                        <div id='compartilhamento'>

                            <div className='mb-2'>
                                <span className='text-2xl text-sub font-light'>COMPARTILHAMENTO DE DADOS PESSOAIS</span>
                            </div>

                            <div className='text-main font-light'>
                                <div className='mb-4'>
                                    <span>É possível que a <strong>Alares</strong> compartilhe seus dados para cumprir obrigações legais e para que seja possível prestar os serviços contratados por Você. Para isso, existem parceiros que auxiliam a Alares com sua gestão administrativa, hospedagem de dados, realização de atividades de análise para oferecermos melhores produtos e serviços.
                                        Abaixo informamos com quais organizações compartilhamos seus dados pessoais e por quais motivos:</span>
                                </div>

                                <div className='pl-5 mb-4'>
                                    <ul className='list-disc'>
                                        <li><span className='underline'>Parceiros e Empresas Terceirizadas: </span>para que seja possível a entrega de nossos serviços de gestãoe atendimentos, como serviços de hospedagem para armazenamento de dados, terceirizados que prestam serviços de gestão e serviços de atendimento ao cliente (“call centers”).</li>
                                        <li><span className='underline'>Bancos, financeiras, operadoras de cartões e meios de pagamentos:</span> para processarmos os pagamentos realizados por Você, cumprirmos com obrigações fiscais e nos prevenirmos de possíveis fraudes.</li>
                                        <li><span className='underline'>Empresas de Análise:</span> Algumas informações obtidas pelo atendimento ao cliente, como, por exemplo, resultados de pesquisas de satisfação, podem ser compartilhadas com empresas especializadas para que possamos otimizar e melhorar os nossos produtos e serviços.
                                            Não buscamos identificar outornar identificável os titulares dos dados pessoais e as informações compartilhadas são somente aquelas necessárias para que seja efetuada a análise. Sempre que possível, realizaremos a anonimização dos dados pessoais que poderiam vir a identificar o nosso cliente.</li>
                                        <li><span className='underline'>Perfis de redes sociais ou outras submissões:</span> O acesso e ou cadastro nas plataformas e redes sociais da Alares causa o compartilhamento de certos dados pessoais com o Facebook e o Instagram. Assim, aos utilizar essas plataformas, alguns de seus dados pessoais serão compartilhados com as empresas responsáveis por essas plataformas e redes sociais.Não controlamos as políticas e práticas de qualquer outro site ou serviço de terceiros.</li>
                                        <li><span className='underline'>Empresas de Marketing:</span> para o envio de comunicações e ofertas, para esse processo, utilizaremos uma base legal adequada e respeitaremos sua privacidade e seu direito de opor-se ao tratamento desses dados para esta finalidade.</li>
                                        <li><span className='underline'>Órgãos reguladores e de fiscalização:</span> poderemos compartilhar seus dados pessoais com órgãos reguladores, agências de fomento ou órgãos fiscalizadores para responder a processos judiciais, cumprir lei ou regulamento, quando requisitado em caso de obrigação legal. Ainda, para o exercício regular de nossos direitos em processos judiciais e administrativos, se necessário ou cumprindo ordem judicial, ou atendendo a solicitação de autoridade competente ou órgão fiscalizador.</li>
                                        <li><span className='underline'>Empresas prestadoras de serviços de telecomunicações: </span>para atendimento de reclamações dos consumidores e cumprimento de normas e obrigações aplicáveis ao segmento de telecomunicações, como, para procedimentos de portabilidade de números telefônicos entre empresas prestadoras dos serviços de telefonia fixa comutada ou telefonia móvel,
                                            <div>
                                                <ul>
                                                    <li>i. ABR Telecom (Entidade Administradora da Portabilidade Numérica no Brasil;</li>
                                                    <li>ii. Telecall – Telexperts Telecomunicações (Prestadora MVNO);</li>
                                                    <li>iii. TIP – TIP TECNOLOGIA LTDA (Fornecedora de Voz SCM);</li>
                                                    <li>iv. DATORA – DATORA TELECOMUNICACOES LTDA (Fornecedora de Voz SCM) e</li>
                                                    <li>v. Demais operadoras Serviço Telefônico Fixo Comutado (STFC) presentes no ambiente de portabilidade.</li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li><span className='underline'>Empresas de cobrança:</span> Empresas terceirizadas que auxiliam no recebimento do pagamento de nossos serviços e produtos utilizados.</li>
                                        <li><span className='underline'>Para resguardar e proteger os direitos da Alares e seus colaboradores:</span> para cumprir obrigações legais, ordens judiciais ou proteger os direitos, propriedade ou segurança de nossa organização e nossos funcionários.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div id='transferencia'>
                            <div className='mb-2'>
                                <span className='text-2xl text-sub font-light'>TRANSFERÊNCIA INTERNACIONAL DE DADOS PESSOAIS</span>
                            </div>

                            <div className='mb-4 text-main font-light'>
                                <span>A <strong>Alares</strong> possui sede no Brasil mas poderá realizar transferência internacional de dados pessoais por meio de operadores, sobretudo para o armazenamento destas informações. A transferência destes dados ocorrerá somente por meio de parceiros e/ou fornecedores que respeitem critérios adequados de proteção de dados pessoais.
                                    <br /><br />
                                    Além disso, o usuário que acessar ou usar os serviços que disponibilizamos localizado fora do país consente com a transferência dos seus dados pessoais para o Brasil e para outros países, dentro dos limites da legalidade do ordenamento jurídico brasileiro.
                                    <br /><br />
                                    Ao usar nossos produtos ou serviços ou fornecer dados pessoais para Nós, Você concorda com o tratamento e a transferência internacional de seus dados pessoais nos casos em que seja essencial para prestação dos serviços e execução do seu contrato conosco.</span>
                            </div>
                        </div>


                        <div id='decisoes'>
                            <div className='mb-2'>
                                <span className='text-2xl text-sub font-light'>DECISÕES AUTOMATIZADAS, SEGMENTAÇÃO E PROFILING</span>
                            </div>

                            <div className='mb-4 text-main font-light'>
                                <span>
                                    Algumas situações de tratamento de dados pessoais podem demandar a utilização de algoritmos designados para automatizar etapas de nossos trabalhos. A Alares se certifica de utilizar critérios claros para os seus processos de decisão automatizada e informar o titular dos dados sempre que seus dados passam por esse tipo de decisão.
                                    <br /><br />
                                    Se os seus dados pessoais foram submetidos a um processo de decisão automatizada, Você tem o direito de solicitar a revisão do resultado por meio de solicitação ao Encarregado de dados por meio dos canais indicados no item <strong>“ENTRE EM CONTATO CONOSCO”</strong>.
                                </span>
                            </div>
                        </div>

                        <div id='direitos'>
                            <div className='mb-2'>
                                <span className='text-2xl text-sub font-light'>OS DIREITOS DO TITULAR DE DADOS</span>
                            </div>

                            <div className='mb-4 text-main font-light'>
                                <span>
                                    Além dos direitos e garantias estabelecidas no Marco Civil da Internet (Lei nº 12.965/14), no Código de Defesa do Consumidor (Lei nº 8.078/90), nas demais normas e regulamentos do setor de telecomunicações, são previstos na Lei Geral de Proteção de Dados (Lei 13.709/18) os seguintes direitos ao titular de dados:
                                </span>
                            </div>

                            <div>
                                <table className='font-light text-main text-sm mb-4'>
                                    <tr>
                                        <th className='border border-primary px-4'>Direito</th>
                                        <th className='border border-primary px-4'>Explicação</th>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>Direito de acesso</td>
                                        <td className='border border-primary px-4'>
                                            Você pode solicitar informações e receber uma cópia dos seus dados pessoais, quando tratados por Nós.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>Direito de exclusão</td>
                                        <td className='border border-primary px-4'>
                                            Você pode solicitar a exclusão dos seus dados pessoais de nossas plataformas. A solicitação poderá ser atendida quando os dados não forem mais necessários ou caso nossa relação negocial tenha se encerrado. No entanto, seus dados serão mantidos para cumprirmos com nossas obrigações legais, para o exercício regular de nossos direitos ou em caso de justificativa viável para que sejam mantidos. Em caso de solicitação de exclusão, será respeitado o prazo de armazenamento mínimo de informações de usuários de aplicações de Internet, determinado pela legislação brasileira.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>Direito de objeção/oposição a um tratamento de dados</td>
                                        <td className='border border-primary px-4'>
                                            Você pode solicitar a exclusão dos seus dados pessoais de nossas plataformas. A solicitação poderá ser atendida quando os dados não forem mais necessários ou caso nossa relação negocial tenha se encerrado. No entanto, seus dados serão mantidos para cumprirmos
                                            om nossas obrigações legais, para o exercício regular de nossos direitos ou em caso de justificativa viável para que sejam mantidos. Em caso de solicitação de exclusão, será respeitado o prazo de armazenamento mínimo de informações de usuários de aplicações de Internet, determinado pela legislação brasileira.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>Direito de objeção/oposição a um tratamento de dados</td>
                                        <td className='border border-primary px-4'>
                                            Você tem o direito de contestar como as empresas da Alares estão tratando seus dados pessoais.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>Direito de solicitar o bloqueio ou eliminação</td>
                                        <td className='border border-primary px-4'>
                                            Caso não exista uma justificativa legal para continuarmos com o tratamento de seus dados, Você pode solicitar a eliminação, anonimização ou bloqueio das informações.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>Compartilhamento</td>
                                        <td className='border border-primary px-4'>
                                            Você pode solicitar informações sobre quais as entidades públicas e privadas com as quais os seus dados pessoais são compartilhados.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>Direito de restringir o
                                            processamento</td>
                                        <td className='border border-primary px-4'>
                                            Você pode se opor de forma integral ou parcial ao tratamento de seus dados pessoais.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>Direito à revisão de decisão automatizada</td>
                                        <td className='border border-primary px-4'>
                                            Você pode solicitar a revisão de decisões que afetem seus interesses e que tenham sido tomadas com base em operações automatizadas de tratamento de dados pessoais;
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>Direito à explicação da lógica por trás da coleta dos seus dadoso</td>
                                        <td className='border border-primary px-4'>
                                            Direito de obter informação sobre a possibilidade e as consequências de não fornecer o seu consentimento sobre determinada operação de tratamento de seus dados pessoais.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>Direito de revogação do consentimento</td>
                                        <td className='border border-primary px-4'>
                                            Você tem o direito de revogar seu consentimento, no entanto, isso quer dizer que os tratamentos realizados com seus dados pessoais antes da revogação foram ilegítimos. Vale ressaltar que revogar seu consentimento pode inviabilizar a contratação ou acesso aos produtos e/ou serviços comercializados pelas empresas da Alares, ou impedir o acesso a funcionalidades de determinados produtos e/ou serviços por Você contratados. Sempre que Você nos solicitar a revogação do seu consentimento, comunicaremos a Você as consequências deste pedido.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>Direito de portabilidade</td>
                                        <td className='border border-primary px-4'>
                                            Você também pode solicitar a transferência dos seus dados pessoais a outro fornecedor de serviço ou produto.
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <div className='mb-4 text-main font-light text-justify'>
                                <span>
                                    Quando Você nos fizer uma solicitação, pediremos a Você o envio de informações para confirmação de sua identidade. Essa é uma medida de segurança para garantir que os dados pessoais não sejam divulgados a qualquer pessoa que não tenha direito de recebê-los. Caso Você tenha alguma dúvida, interesse em conversar conosco sobre qualquer questão relacionada aos seus dados ou solicitação, fique à vontade para contatar nosso Encarregado por um dos canais disponíveis no item <strong>“ENTRE EM CONTATO CONOSCO”</strong>
                                </span>
                            </div>
                        </div>

                        <div id='retencao'>
                            <div className='mb-2'>
                                <span className='text-2xl text-sub font-light'>RETENÇÃO DOS DADOS PESSOAIS</span>
                            </div>

                            <div className='mb-4 text-main font-light'>
                                <span>
                                    Manteremos seus dados pessoais somente pelo tempo que for necessário para cumprir com as finalidades para as quais os coletamos, salvo em situações em que teremos que retê-los para cumprimento de obrigações legais, regulatórias, fiscais, contratuais, de prestação de contas ou para salvaguardar ou exercer regularmente os nossos direitos.
                                    <br /><br />
                                    Para determinar o período de retenção adequado para os dados pessoais, consideramos a quantidade, a natureza e a sensibilidade dos dados pessoais, o risco potencial de danos decorrentes do uso não autorizado, a finalidade do tratamento e se podemos alcançar tais propósitos por outros meios, e os requisitos legais aplicáveis.
                                </span>
                            </div>
                        </div>

                        <div id='seguranca'>
                            <div className='mb-2'>
                                <span className='text-2xl text-sub font-light'>SEGURANÇA DOS SEUS DADOS PELA ALARES</span>
                            </div>

                            <div className='mb-4 text-main font-light text-justify'>
                                <span>
                                    Nós da <strong>Alares</strong> implementamos uma série de medidas de segurança para proteger os dados pessoais que recebemos.
                                    <br /><br />
                                    Seguimos boas práticas do mercado para proteger os dados pessoais enviados a Nós, tanto durante a transmissão como em nossa posse. Também revisamos nossas práticas de coleta, armazenamento e processamento de informações, incluindo medidas de segurança física.
                                    <br /><br />
                                    Assim, os dados pessoais coletados pelos sistemas operados por Nós são protegidos de modo a aprimorar continuamente a segurança e a confiabilidade dos nossos serviços. Por sua vez, as empresas da Alares têm como protocolo a adoção das seguintes medidas de segurança abaixo:
                                </span>
                                <div className='pl-5 mb-4'>
                                    <ul className='list-disc'>
                                        <li>Somente autorizar o acesso de pessoas previamente estabelecidas ao local onde são armazenadas as informações coletadas;</li>
                                        <li>Armazenar as informações coletadas em suas Páginas em servidores próprios ou por ela
                                            contratados;</li>
                                        <li>Utilizar os métodos padrão e de mercado para criptografar os dados coletados;</li>
                                        <li>Possuir proteção contra acesso não autorizado a seus sistemas, como sistemas de informação com autenticação e acesso restrito, bases de dados anonimizadas (quando possível) e uso de soluções de segurança da informação, como: firewalls, antivírus, antispam, sistemas de detecção e prevenção de intrusão (IDS/IPS) e webfilter.</li>
                                        <li>Aqueles que acessam as informações se comprometem a manter sigilo. A quebra do sigilo poderá acarretar responsabilidade civil e o responsável poderá ser responsabilizado nos moldes da legislação brasileira.</li>
                                    </ul>
                                </div>
                                <span>
                                    Apesar de adotarmos os melhores esforços para preservar a sua privacidade e proteger os seus dados pessoais, nenhuma transmissão de dados é totalmente segura estando sempre suscetível à ocorrência de incidentes de segurança da informação. Na remota hipótese de incidência de episódios desta natureza, a <strong>Alares</strong> garantirá a adoção de todas as medidas cabíveis para remediar as consequências do evento, sempre garantida a devida transparência ao titular de dados.
                                    <br /><br />
                                    Por isso, pedimos gentilmente que nos ajude a manter um ambiente seguro para todos, mantendo confidenciais todos os nomes de usuário e senhas, utilizando senhas de difícil clonagem, além de adotar boas práticas de segurança em relação à sua conta e aos seus dados.
                                    Caso Você identifique ou tome conhecimento de algo que comprometa a segurança dos seus dados, por favor nos contate por meio dos canais disponíveis no item <strong>“ENTRE EM CONTATO CONOSCO”</strong> abaixo.
                                </span>
                            </div>
                        </div>

                        <div id='entre'>
                            <div className='mb-2'>
                                <span className='text-2xl text-sub font-light'>ENTRE EM CONTATO CONOSCO</span>
                            </div>

                            <div className='mb-4 text-main font-light'>
                                <span>
                                    Caso você deseje obter informações, esclarecer dúvidas, realizar solicitações ou apresentar sugestões sobre o tratamento de dados pessoais realizado pela Alares, poderá entrar em contato com a nossa área de Privacidade no seguinte endereço de contato: <span className='underline'>dpo@alaresinternet.com.br</span>.
                                </span>
                            </div>
                        </div>

                        <div>
                            <div className='pb-4 border-b-2 border-secondary w-full mb-4'>
                                <span className='text-3xl text-main'>POLÍTICAS DE COOKIES</span>
                            </div>

                            <div id='cookies'>
                                <div className='mb-2'>
                                    <span className='text-2xl text-sub font-light'>COOKIES</span>
                                </div>

                                <div className='mb-4 text-main font-light'>
                                    <span>
                                        Como valorizamos e respeitamos a privacidade, assumimos o compromisso de garantir a confidencialidade e a segurança de todos os seus Dados Pessoais durante a prestação de nossos serviços e demais atividades inerentes ao nosso negócio.
                                    </span>
                                </div>
                            </div>

                            <div id='cookies'>
                                <div className='mb-2'>
                                    <span className='text-2xl text-sub font-light'>O QUE SÃO COOKIES?</span>
                                </div>

                                <div className='mb-4 text-main font-light'>
                                    <span>
                                        Cookie é um pequeno arquivo que é instalado em seu dispositivo, quando você visita um ambiente digital. Este arquivo possibilita a coleta de informações em determinadas situações, visando o atendimento de finalidades diversas. Sendo assim, muitas são fundamentais para manter o funcionamento adequado e seguro do site, bem como para viabilizar a oferta de produtos e serviços no website, que podem ser ou não personalizados para você.
                                        <br /><br />
                                        Os cookies podem ser instalados pelo servidor do site que você visita ou por parceiros desse site. O servidor de um website poderá apenas utilizar os cookies que ele mesmo instalou e não tem acesso a outras informações encontradas em seu computador ou dispositivo móvel. Os cookies são armazenados na pasta do navegador em seu equipamento.
                                    </span>
                                </div>
                            </div>

                            <div id='para'>
                                <div className='mb-2'>
                                    <span className='text-2xl text-sub font-light'>PARA QUE SERVEM OS COOKIES?</span>
                                </div>

                                <div className='mb-4 text-main font-light'>
                                    <span className='mb-4'>
                                        A utilização de cookies é algo comum em qualquer website atualmente e o seu uso não prejudica os dispositivos (computadores, smartphones, tablets etc.) em que são armazenados.
                                    </span>
                                    <div className='pl-5'>
                                        <ul className='list-disc'>
                                            <li>Os cookies permitem que nosso website memorize informações sobre a sua visita, o seu idioma preferido, a sua localização, a recorrência das suas sessões e outras variáveis que nós consideramos relevantes para tornar sua experiência muito mais interativa.</li>
                                            <li>Os cookies servem para aprimorar a sua experiência, tanto em termos de performance, como em termos de usabilidade, uma vez que os conteúdos disponibilizados são direcionados às suas necessidades e expectativas.</li>
                                            <li>Os cookies também podem ser utilizados para compilar estatísticas anônimas e agregadas que permitem entender como os usuários utilizam e interagem com o nosso website, bem como para aprimorar suas estruturas e conteúdo. Por serem estatísticas anônimas, não podemos identificá-lo pessoalmente por meio desses dados.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div id='categorias'>
                                <div className='mb-2'>
                                    <span className='text-2xl text-sub font-light'>O QUE SÃO COOKIES?</span>
                                </div>

                                <div className='mb-4 text-main font-light'>
                                    <span>
                                        Os cookies geralmente fazem a interação entre você e o site de maneira mais rápida e mais fácil, o ajudando a navegar entre as diferentes partes de um site. Alguns desses cookies são necessários, porque caso contrário, o site seria incapaz de funcionar adequadamente.
                                        <br /><br />
                                        Outros cookies não são necessários, mas podem ser convenientes para você, já que eles podem, por exemplo, lembrar o nome do usuário, bem como as preferências de idioma. Isto significa que você não precisará preencher as mesmas informações cada vez que visita determinado website.
                                        <br /><br />
                                        As categorias para definição dos cookies são diversas e podem partir de diferentes perspectivas. Neste documento serão apresentadas as categorias que são frequentemente mais usadas na internet. Vale observar que um mesmo cookie pode ser incluído em mais de uma categoria. Segue abaixo as categorias de cookies definidas de acordo com a Autoridade Nacional de Proteção de Dados – ANPD:
                                    </span>
                                </div>

                                <div>
                                    <div className='mb-4'>
                                        <span className='text-main'><strong>I. RESPONSÁVEL PELA GESTÃO</strong></span>
                                    </div>
                                    <div className='mb-4 text-main font-light'>
                                        <div className='pl-5'>
                                            <ul className='list-disc'>
                                                <li>Cookies próprios ou primários: são os cookies utilizados pelo site ou aplicação que você está visitando. Os cookies primários não podem ser usados para rastrear a atividade em outro site que não seja o site original em que foi colocado. Esses tipos de cookies podem incluir informações como credenciais de login, itens do carrinho de compras ou o idioma de sua preferência.</li>
                                                <li>Cookies de terceiros: são cookies criados por um website diferente daquele que você está visitando. São funcionalidades de outros sites que são incorporadas a uma página que você está acessando, como exemplo da exibição de anúncios.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className='mb-4'>
                                        <span className='text-main'><strong>II. NECESSIDADE</strong></span>
                                    </div>
                                    <div className='mb-4 text-main font-light'>
                                        <div className='pl-5'>
                                            <ul className='list-disc'>
                                                <li>Cookies necessários: Fundamental para o funcionamento da página eletrônica ou para a prestação dos nossos serviços.</li>
                                                <li>Cookies não necessários: Não se enquadram na definição de cookies necessários e cuja desabilitação não impede o funcionamento do site ou aplicação ou a utilização dos nossos serviços. Exemplos de cookies não necessários incluem, entre outros, aqueles utilizados pararastrear preferências, medir o desempenho da página ou serviço, além de exibir anúncios ou outros conteúdos incorporados.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className='mb-4'>
                                        <span className='text-main'><strong>III. FINALIDADE</strong></span>
                                    </div>
                                    <div className='mb-4 text-main font-light'>
                                        <div className='pl-5'>
                                            <ul className='list-disc'>
                                                <li>Cookies analíticos ou de desempenho: possibilitam coletar dados sobre como você utiliza o site, quais páginas visita com mais frequência, a ocorrência de erros e/ou informações sobre o próprio desempenho do site ou da aplicação.</li>
                                                <li>Cookies de funcionalidade: são usados para fornecer os serviços básicos e podem lembrar suas preferências, como exemplo o nome de usuário, região ou idioma.</li>
                                                <li>Cookies de publicidade: são utilizados para coletar informações com a finalidade de exibir anúncios personalizados para você de acordo com seus hábitos de navegação.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className='mb-4'>
                                        <span className='text-main'><strong>IV. PERÍODO DE RETENÇÃO DAS INFORMAÇÕES</strong></span>
                                    </div>
                                    <div className='mb-4 text-main font-light'>
                                        <div className='pl-5'>
                                            <ul className='list-disc'>
                                                <li>Cookies de sessão ou temporários: são projetados para coletar e armazenar informações enquanto você acessa um site. Este tipo de Cookie é descartado após você fechar o navegador utilizado. Podemos armazenar informações que são relevantes apenas para a prestação do serviço solicitado por você ou com uma finalidade específica temporária, como exemplo, salvar a lista de produtos ou serviços que você deseja adquirir no carrinho de um site de compras.</li>
                                                <li>Cookies persistentes: os dados coletados por meio desses cookies ficam armazenados e podem ser acessados e processados por um período definido por nós.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id='tipo'>
                                <div className='mb-2'>
                                    <span className='text-2xl text-sub font-light'>QUE TIPOS DE COOKIES UTILIZAMOS?</span>
                                </div>
                            </div>
                            <div className='mb-4 text-main font-light'>
                                <span>
                                    Procuramos explicar de forma transparente como, quando e porque utilizamos cookies. Dessa maneira, utilizamos este recurso para as finalidades indicadas abaixo:
                                </span>
                            </div>

                            <div>
                                <table className='font-light text-main text-sm mb-4'>
                                    <tr>
                                        <th className='border border-primary px-4'>Tipo de Cookies</th>
                                        <th className='border border-primary px-4'>Nome</th>
                                        <th className='border border-primary px-4'>Tipo de Cookies</th>
                                        <th className='border border-primary px-4'>Tempo de armazenamento</th>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4' rowSpan={8}>Cookies de desempenho</td>
                                        <td className='border border-primary px-4'>_ga</td>
                                        <td className='border border-primary px-4' rowSpan={6}>Fornecido pelo Google Analytics (tag presente no GTM)</td>
                                        <td className='border border-primary px-4'>2 anos</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>_gat</td>
                                        <td className='border border-primary px-4'>1 minuto</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>_gid</td>
                                        <td className='border border-primary px-4'>24 horas</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>_utma</td>
                                        <td className='border border-primary px-4'>2 anos a partir da criação/atualização</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>_utmc</td>
                                        <td className='border border-primary px-4'>Fim da sessão do navegador</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>_utmz</td>
                                        <td className='border border-primary px-4'>6 meses a partir da configuração/atualização</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>_trf.src</td>
                                        <td className='border border-primary px-4'>Guardar a referência da origem da visita do usuário ao site.</td>
                                        <td className='border border-primary px-4'>1 ano</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>rdtrk</td>
                                        <td className='border border-primary px-4'>Guardar a lista de todas as páginas que o visitante acessou dentro do seu domínio, mesmo antes da conversão (somente para contas com acesso ao Lead Tracking).</td>
                                        <td className='border border-primary px-4'>1 ano</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4' rowSpan={2}><strong>Cookies de publicidade</strong></td>
                                        <td className='border border-primary px-4'>1P_JAR</td>
                                        <td className='border border-primary px-4'>Armazenar informações de acesso e personalizar anúncios.</td>
                                        <td className='border border-primary px-4'>1 mês</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>AID</td>
                                        <td className='border border-primary px-4'>Armazenar as atividades do usuário no Google em dispositivos diferentes, inclusive para anúncios de publicidade.</td>
                                        <td className='border border-primary px-4'>1,5 anos</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4' rowSpan={16}><strong>Cookies de terceiros</strong></td>
                                        <td className='border border-primary px-4'>APISID</td>
                                        <td className='border border-primary px-4'>Usado pelo Google para armazenar as preferências do usuário.</td>
                                        <td className='border border-primary px-4'>2 anos</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>DV</td>
                                        <td className='border border-primary px-4'>Construir um perfil de interesses do usuário e exibir anúncios do Google de forma relevante e personalizada.</td>
                                        <td className='border border-primary px-4'>alguns minutos</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>HSID</td>
                                        <td className='border border-primary px-4'>Usado pelo Google para armazenar as preferências do usuário.</td>
                                        <td className='border border-primary px-4'>2 anos</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>NID</td>
                                        <td className='border border-primary px-4'>Lembrar suas preferências e outras informações (idioma preferido, nº de, resultados de pesquisa, ativação do filtro SafeSearch do Google).</td>
                                        <td className='border border-primary px-4'>6 meses</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>OTZ</td>
                                        <td className='border border-primary px-4'>Informações de tráfego mais voltado para o Google Analytics.</td>
                                        <td className='border border-primary px-4'>1 mês</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>SAPISID</td>
                                        <td className='border border-primary px-4'>Usado pelo Google para armazenar as preferências do usuário.</td>
                                        <td className='border border-primary px-4'>2 anos</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>SEARCH_SAMESITE</td>
                                        <td className='border border-primary px-4'>Construir perfil de interesses do usuário e exibir anúncios do Google de forma relevante e personalizada.</td>
                                        <td className='border border-primary px-4'>6 meses</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>SID</td>
                                        <td className='border border-primary px-4'>Usado pelo Google para armazenar as preferências do usuário.</td>
                                        <td className='border border-primary px-4'>2 anos</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>SIDCC</td>
                                        <td className='border border-primary px-4'>Cookie de segurança para proteger os dados dos usuários contra acesso não autorizado.</td>
                                        <td className='border border-primary px-4'>1 ano</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>SSID</td>
                                        <td className='border border-primary px-4'>Cookie de segurança para proteger os dados dos usuários contra acesso não autorizado.</td>
                                        <td className='border border-primary px-4'>2 anos</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>_Secure-1PAPISID</td>
                                        <td className='border border-primary px-4'>Construir perfil de interesses do usuário e exibir anúncios do Google de forma relevante e personalizada.</td>
                                        <td className='border border-primary px-4'>2 anos</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>_Secure-1PSID</td>
                                        <td className='border border-primary px-4'>Construir perfil de interesses do usuário e exibir anúncios do Google de forma relevante e personalizada.</td>
                                        <td className='border border-primary px-4'>2 anos</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>_Secure-1PSID</td>
                                        <td className='border border-primary px-4'>Construir perfil de interesses do usuário e exibir anúncios do Google de forma relevante e personalizada.</td>
                                        <td className='border border-primary px-4'>2 anos</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>_Secure-3PAPISID</td>
                                        <td className='border border-primary px-4'>Construir perfil de interesses do usuário e exibir anúncios do Google de forma relevante e personalizada.</td>
                                        <td className='border border-primary px-4'>2 anos</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>_Secure-3PSID</td>
                                        <td className='border border-primary px-4'>Construir perfil de interesses do usuário e exibir anúncios do Google de forma relevante e personalizada.</td>
                                        <td className='border border-primary px-4'>2 anos</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>_Secure-3PSIDCC</td>
                                        <td className='border border-primary px-4'>Construir perfil de interesses do usuário e exibir anúncios do Google de forma relevante e personalizada.</td>
                                        <td className='border border-primary px-4'>2 anos</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4' rowSpan={4}><strong>Cookies de funcionalidade</strong></td>
                                        <td className='border border-primary px-4'>citycode</td>
                                        <td className='border border-primary px-4'>Armazenar e gerenciar a cidade escolhida pelo usuário.</td>
                                        <td className='border border-primary px-4'>1 dia</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>citycode</td>
                                        <td className='border border-primary px-4'>Armazenar e gerenciar a cidade escolhida pelo usuário.</td>
                                        <td className='border border-primary px-4'>1 dia</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>moove_gdpr_popup</td>
                                        <td className='border border-primary px-4'>Este cookie é usado para salvar suas preferências de configuração de cookie.</td>
                                        <td className='border border-primary px-4'>1 dia</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-primary px-4'>moove_gdpr_popup</td>
                                        <td className='border border-primary px-4'>Este cookie é usado para salvar suas preferências de configuração de cookie.</td>
                                        <td className='border border-primary px-4'>1 dia</td>
                                    </tr>
                                </table>
                            </div>

                            <div className='mb-4 text-main font-light'>
                                <span>
                                    Ao acessar o nosso website, você permite o uso de cookies necessários para o funcionamento do nosso site e poderá autorizar ou não o uso cookies não necessários, nos termos desta Política.
                                    <br /><br />
                                    Caso não concorde com o uso de cookies, você pode:
                                    <br /><br />
                                    I. Ajustar as configurações de seu navegador para não permitir o uso de cookies não necessários;
                                    ou
                                    <br /><br />
                                    II. não acessar o nosso website.
                                    <br /><br />
                                    Lembramos que desabilitar o uso de cookies pode impactar na sua experiência ao navegar em nosso website.
                                </span>
                            </div>
                        </div>

                        <div id='possivel' className='text-main'>
                            <div className='mb-2'>
                                <span className='text-2xl text-sub font-light'>É POSSÍVEL CONTROLAR OU EXCLUIR COOKIES?</span>
                            </div>

                            <div className='mb-4 text-main font-light'>
                                <span>
                                    A maioria dos navegadores de Internet são configurados para aceitar automaticamente os cookies, mas existem várias formas de gerenciar cookies.
                                    <br /><br />
                                    Você pode alterar as configurações para bloquear o uso de cookies ou alertá-lo quando um cookie estiver sendo enviado para seu dispositivo, por exemplo. É importante te informar que ao desabilitar os cookies, talvez você não consiga visitar certas áreas de uma página ou talvez não receba informações personalizadas quando visitar uma página do website da Alares.
                                    <br /><br />
                                    Caso utilize dispositivos diferentes para acessar o nosso website (computador, smartphone, tablet etc.), você deve assegurar-se de que cada navegador, em dispositivos distintos, esteja ajustado para atender às suas preferências em relação aos cookies.
                                    <br /><br />
                                    Você pode modificar o seu navegador para desativar os cookies. Isso é muito fácil de fazer. Por favor, anote: se você desativar os cookies, o seu nome de usuário e senha não serão mais armazenados em qualquer site. Abaixo separamos o passo a passo de:
                                </span>
                            </div>

                            <div>
                                <div className='mb-4'>
                                    <span><strong>FIREFOX:</strong></span>
                                </div>

                                <div className='pl-5 mb-4'>
                                    <ul className='list-disc'>
                                        <li>Abra o Firefox.</li>
                                        <li>No topo da janela do Firefox, clique no botão “Firefox” e, em seguida, selecione “Opções”.</li>
                                        <li>Selecione o painel “Privacidade”.</li>
                                        <li>Defina “O Firefox deve:” para “Usar configurações personalizadas para o histórico”.</li>
                                        <li>Desmarque a opção “Aceitar cookies de sites” para desativar os cookies.</li>
                                        <li>Clique em “OK” para fechar a janela Opções</li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <div className='mb-4'>
                                    <span><strong>INTERNET EXPLORER:</strong></span>
                                </div>

                                <div className='pl-5 mb-4'>
                                    <ul className='list-disc'>
                                        <li>Abra o Internet Explorer.</li>
                                        <li>Clique no botão “Ferramentas” e clique em “Opções da Internet”.</li>
                                        <li>Clique na guia “Privacidade” e, em seguida, em “Configurações”, mova o controle para cima para bloquear todos os cookies e clique em “OK”</li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <div className='mb-4'>
                                    <span><strong>GOOGLE CHROME:</strong></span>
                                </div>

                                <div className='pl-5 mb-4'>
                                    <ul className='list-disc'>
                                        <li>Abra o Google Chrome.</li>
                                        <li>Clique no ícone da ferramenta.</li>
                                        <li>Selecione “Configurações”.</li>
                                        <li>Perto do final da página, clique em “Mostrar configurações avançadas”.</li>
                                        <li>Na seção “Privacidade”, clique em “Configurações de conteúdo”.</li>
                                        <li>Para desativar os cookies, selecione “Bloquear as configurações de site de quaisquer dados”.</li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <div className='mb-4'>
                                    <span><strong>SAFARI:</strong></span>
                                </div>

                                <div className='pl-5 mb-4'>
                                    <ul className='list-disc'>
                                        <li>Escolha “Preferências” na barra de ferramentas e clique em “Privacidade” (Você podeencontrar a barra de ferramentas que se parece com uma roda dentada, acima e à direita na janela do Safari.)</li>
                                        <li>Na seção “Bloquear cookies”, você pode especificar se e quando o Safari deve aceitar cookies de sites.</li>
                                        <li>Para ver uma explicação sobre as opções, clique no botão de ajuda (ponto de interrogação).</li>
                                        <li>Se você quiser ver quais sites armazenam cookies no seu computador, clique em detalhes.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div id='contato'>
                            <div className='mb-2'>
                                <span className='text-2xl text-sub font-light'>CONTATO</span>
                            </div>

                            <div className='mb-4 text-main font-light'>
                                <span>
                                Para quaisquer questões ou dúvidas sobre esta política de cookies, você pode entrar em contato conosco por meio do endereço eletrônico: <span className='text-sub'>dpo@alaresinternet.com.br</span> ou se preferir saber mais informações sobre nós e como protegemos seus dados, consulte nossa <span className='text-sub'>Política de Privacidade</span>.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </section>
    )
}
