import { useState, useEffect } from "react";
// Importando as imagens
import CatedralImg from "@/assets/images/info/Catedral.webp";
import BrasiliaNoturnaImg from "@/assets/images/info/Brasilia-Noturna.webp";
import BrasiliaFamiliaImg from "@/assets/images/info/Brasilia-em-Familia.webp";
import BrasiliaMemoriaVivaImg from "@/assets/images/info/Brasilia-Memoria-Viva.webp";
import BrasiliaEsplanadoDosMinisteriosImg from "@/assets/images/info/006-ESPLANADA-DOS-MINISTERIOS.webp";
import BrasiliaCatedralMetropolitanaImg from "@/assets/images/info/002-CATEDRAL-METROPOLITANA.webp";
import { ScrollTo } from "@/helpers";

interface SlideItem {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    mainTitle: string;
    description: string;
}


export default function Info() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);


    function gotoScrool(e: any) {
        setTimeout(() => {
            ScrollTo(e);
        }, 500);
    }

    // Array de slides com as imagens importadas e suas descrições
    const slides: SlideItem[] = [
        {
            id: 1,
            image: CatedralImg,
            title: "Brasília",
            subtitle: "CATEDRAL",
            mainTitle: "Brasília Catedral",
            description:
                "Catedral Metropolitana de Brasília, famosa pelos seus vitrais azuis e verdes que iluminam todo o espaço com luz natural. A catedral é um marco da arquitetura moderna brasileira, projetada por Oscar Niemeyer, e possui anjos suspensos no centro, criando um ambiente leve e espiritual. É um dos principais pontos turísticos da capital do Brasil.",
        },
        {
            id: 2,
            image: BrasiliaNoturnaImg,
            title: "Brasília",
            subtitle: "NOTURNA",
            mainTitle: "Brasília noturna",
            description:
                "Descubra a capital iluminada em um tour exclusivo pelos monumentos e pontos turísticos mais emblemáticos. Uma experiência única para conhecer a arquitetura moderna de Brasília sob um novo olhar, com todo conforto e segurança.",
        },
        {
            id: 3,
            image: BrasiliaFamiliaImg,
            title: "Brasília",
            subtitle: "EM FAMÍLIA",
            mainTitle: "Brasília em família",
            description:
                "Roteiros pensados especialmente para toda a família, com atividades divertidas e educativas. Conheça a história e cultura de Brasília de forma interativa e envolvente, criando memórias inesquecíveis com quem você ama.",
        },
        {
            id: 4,
            image: BrasiliaMemoriaVivaImg,
            title: "Brasília",
            subtitle: "MEMÓRIA VIVA",
            mainTitle: "Brasília Memória Viva",
            description:
                "Roteiros pensados especialmente para toda a família, com atividades divertidas e educativas. Conheça a história e cultura de Brasília de forma interativa e envolvente, criando memórias inesquecíveis com quem você ama.",
        },
        {
            id: 5,
            image: BrasiliaEsplanadoDosMinisteriosImg,
            title: "Brasília",
            subtitle: "ESPLANADA DOS MINISTÉRIOS",
            mainTitle: "Brasília Esplanada dos Ministérios",
            description:
                "Roteiros pensados especialmente para toda a família, com atividades divertidas e educativas. Conheça a história e cultura de Brasília de forma interativa e envolvente, criando memórias inesquecíveis com quem você ama.",
        },
        {
            id: 6,
            image: BrasiliaCatedralMetropolitanaImg,
            title: "Brasília",
            subtitle: "CATEDRAL METROPOLITANA",
            mainTitle: "Brasília Catedral Metropolitana",
            description:
                "Roteiros pensados especialmente para toda a família, com atividades divertidas e educativas. Conheça a história e cultura de Brasília de forma interativa e envolvente, criando memórias inesquecíveis com quem você ama.",
        },
    ];

    // Autoplay - passa automaticamente a cada 3 segundos
    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 3500); // 3000ms = 3 segundos

            return () => clearInterval(interval);
        }
    }, [currentSlide, isPaused, slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsPaused(true); // Pausa o autoplay quando o usuário clicar
        setTimeout(() => setIsPaused(false), 3500); // Retoma após 6 segundos
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setIsPaused(true); // Pausa o autoplay quando o usuário clicar
        setTimeout(() => setIsPaused(false), 3500); // Retoma após 6 segundos
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsPaused(true); // Pausa o autoplay quando o usuário clicar
        setTimeout(() => setIsPaused(false), 3500); // Retoma após 6 segundos
    };

    return (
        <section className="py-16">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Lado esquerdo - Texto e botão */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-5xl lg:text-5xl font-bold text-gray-800 mb-6 transition-all duration-500">
                                {slides[currentSlide].mainTitle}
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed transition-all duration-500">
                                {slides[currentSlide].description}
                            </p>
                        </div>

                        <button
                        onClick={() => gotoScrool("#destinos")}
                        className="bg-gradient-to-r cursor-pointer from-azul-1 to-blue-700 hover:from-blue-600 hover:to-blue-700 text-white hover:text-amarelo-1 font-bold px-8 py-4 rounded-lg uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                            Descobrir mais
                        </button>
                    </div>

                    {/* Lado direito - Carrossel */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {/* Container do carrossel */}
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                            <div
                                className="flex transition-transform duration-500 ease-out"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {slides.map((slide) => (
                                    <div key={slide.id} className="min-w-full relative">
                                        <div className="aspect-[4/3] bg-gradient-to-br from-blue-400 to-blue-400 flex items-center justify-center">
                                            {slide.image ? (
                                                <img
                                                    src={slide.image}
                                                    alt={`${slide.title} - ${slide.subtitle}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="text-center text-white">
                                                    <p className="text-sm mb-2">Imagem {slide.id}</p>
                                                    <p className="text-xs opacity-75">
                                                        Adicione sua imagem webp aqui
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        {/* Overlay com título */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                                            <h3 className="text-4xl font-bold text-white">
                                                {slide.title}
                                            </h3>
                                            <p className="text-xl text-white/90 font-semibold">
                                                {slide.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Botões de navegação */}
                        <button
                            onClick={prevSlide}
                            className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-10"
                            aria-label="Slide anterior"
                        >
                            <svg
                                className="w-6 h-6 text-gray-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-10"
                            aria-label="Próximo slide"
                        >
                            <svg
                                className="w-6 h-6 text-gray-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>

                        {/* Indicadores de slide (bolinhas) */}
                        <div className="flex justify-center gap-2 mt-6">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                                        ? "bg-blue-600 w-8"
                                        : "bg-gray-300 hover:bg-gray-400"
                                        }`}
                                    aria-label={`Ir para slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}