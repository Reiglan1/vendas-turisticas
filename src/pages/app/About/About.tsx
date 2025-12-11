import DashboardImg from "@/assets/images/info/006-ESPLANADA-DOS-MINISTERIOS.webp";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";

export default function AboutPage() {

    return (
        <>
            <div className="relative w-full h-[300px] sm:h-[400px]">
                {/* Imagem de fundo */}
                <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src={DashboardImg}
                    alt="Dashboard"
                />

                {/* Overlay escuro para melhorar legibilidade do texto */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Conteúdo do texto */}
                <div className="relative">
                    <div className="container">
                        <div className="text-4xl md:text-5xl text-center font-bold mb-4 text-white pt-30">
                            Quem somos
                        </div>
                        <div className="text-lg md:text-xl text-center text-white">
                            BSB Turismo e Entretenimento
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <ScrollReveal animation="fade-in-left">
                    <div className="pt-20">
                        A <strong>BSB Turismo e Entretenimento</strong> é uma empresa especializada em experiências turísticas e culturais em Brasília e região. Desde 2013, trabalhamos para apresentar a capital do Brasil de forma única, combinando história, arquitetura, cultura e entretenimento em roteiros completos e acessíveis.
                    </div>
                </ScrollReveal>
                <ScrollReveal animation="fade-in-right">
                    <div className="pt-5">
                        Oferecemos <strong>city tours, passeios temáticos, excursões, experiências personalizadas</strong>, além de apoio para grupos escolares, famílias, empresas e visitantes que desejam conhecer Brasília com profundidade e segurança.
                    </div>
                </ScrollReveal>
                <ScrollReveal animation="fade-in-left">
                    <div className="pt-5">
                        Nossa missão é transformar cada passeio em uma experiência memorável — seja mostrando os principais cartões-postais da cidade, conduzindo roteiros educativos ou criando tours exclusivos conforme o perfil de cada cliente.
                    </div>
                </ScrollReveal>
                <ScrollReveal animation="fade-in-right">
                    <div className="pt-5 pb-20">
                        Com atendimento humanizado, profissionais qualificados e compromisso com a qualidade, a <strong>BSB Turismo e Entretenimento</strong> se destaca por oferecer flexibilidade, responsabilidade e um olhar apaixonado pela capital federal. Mais do que viajar, queremos proporcionar conhecimento, boas histórias e momentos que marcam.
                    </div>
                </ScrollReveal>
            </div>
        </>
    );
}