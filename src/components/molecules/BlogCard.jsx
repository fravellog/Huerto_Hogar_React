import Image from '../atoms/Image';
import Button from '../atoms/Button'; // O podrías crear un atom LinkButton

export default function BlogCard({ post }) {
  const { title, summary, imageSrc, link, linkText } = post;

  return (
    // Replicando .blog-card con Tailwind
    <div className="bg-white rounded-2xl shadow-md p-6 text-center w-full max-w-sm transition hover:shadow-lg flex flex-col items-center">
      <Image
        src={imageSrc}
        alt={title}
        // Replicando .blog-img
        className="w-full h-40 object-cover mb-4 rounded-xl shadow-sm"
      />
      {/* Replicando .blog-card-titulo */}
      <h3 className="text-xl font-semibold text-green-800 mb-2">{title}</h3>
      {/* Replicando .blog-card-resumen */}
      <p className="text-gray-600 text-sm mb-4 flex-grow">{summary}</p>
      {/* Usando 'a' porque va a un link externo */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        // Replicando .btn y .btn-blog (similar a Button atom)
        className="mt-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition duration-200 ease-in-out inline-block"
      >
        {linkText}
      </a>
    </div>
  );
}