import Image from "next/image";

interface Certificate {
    title: string;
    imageSrc: string;
    pdfHref: string;
    alt: string;
}

const certificates: Certificate[] = [
    {
        title: "ISO 9001 Certification",
        imageSrc: "/images/credentials/iso-9001.webp",
        pdfHref: "/ISO 9001 -  Prorecruit Versaatech limited.pdf",
        alt: "ISO 9001 Certification - Prorecruit Versaatech Limited",
    },
    {
        title: "Registration Certificate",
        imageSrc: "/images/credentials/registration-certificate.webp",
        pdfHref: "/Prorecruit Versaatech Limited Registration Certificate.pdf",
        alt: "Prorecruit Versaatech Limited Registration Certificate",
    },
];

export function Certifications() {
    return (
        <section className="py-12 px-4 md:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-display text-foreground mb-4">
                    Our Certifications
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Versaatech is committed to maintaining the highest standards of quality and compliance.
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {certificates.map((cert) => (
                        <a
                            key={cert.title}
                            href={cert.pdfHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block text-center"
                        >
                            <div className="overflow-hidden rounded-lg border border-border shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]">
                                <Image
                                    src={cert.imageSrc}
                                    alt={cert.alt}
                                    width={600}
                                    height={800}
                                    className="w-full h-auto"
                                    quality={75}
                                    loading="lazy"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-foreground group-hover:text-blue-600 transition-colors duration-300">
                                {cert.title}
                            </h3>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
