import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ArrowLeft, ExternalLink, Calendar, ChevronRight } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useProducts();
  
  const product = products.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button 
          onClick={() => navigate('/')} 
          className="text-blue-600 hover:underline flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Showcase
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen animate-fade-in">
      {/* Navigation Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-2 text-[12px] text-gray-500 font-medium border-b border-gray-100/50 sm:border-none">
        <Link to="/" className="hover:text-black transition-colors">Showcase</Link>
        <ChevronRight size={10} className="text-gray-300" />
        <span className="text-[#1D1D1F]">{product.title}</span>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-8">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-5/12 space-y-5">
            <div className="inline-block">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#1D1D1F] border-b border-[#1D1D1F] pb-0.5">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-[#1D1D1F] tracking-tighter leading-[1.05]">
              {product.title}
            </h1>
            <p className="text-2xl sm:text-3xl text-[#86868b] font-medium leading-tight tracking-tight">
              {product.tagline}
            </p>
            
            <div className="pt-6 flex flex-wrap gap-4 items-center">
              <a 
                href={product.link}
                className="inline-flex items-center gap-2 bg-[#0071e3] hover:bg-[#0077ED] text-white px-6 py-2.5 rounded-full text-[14px] font-medium transition-all hover:shadow-lg hover:shadow-blue-500/20"
              >
                Open {product.title} <ExternalLink size={14} />
              </a>
              <div className="text-[13px] font-medium text-gray-500">
                v{product.attributes.find(a => a.label === 'Version')?.value || '1.0'}
              </div>
            </div>
          </div>
          
          <div className="md:w-7/12 w-full">
            <div className="aspect-[16/10] w-full rounded-[24px] overflow-hidden shadow-2xl shadow-gray-200 ring-1 ring-gray-100">
              <img 
                src={product.heroImage} 
                alt={product.title} 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Content */}
      <div className="bg-[#F5F5F7] py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Description */}
            <div className="lg:col-span-8 space-y-16">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-[#1D1D1F] tracking-tight">Overview</h3>
                {/* Markdown Content */}
                <div 
                  className="prose prose-lg prose-gray max-w-none text-[17px] leading-relaxed text-[#424245] font-normal 
                             [&>p]:mb-6 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-[#1D1D1F] [&>h2]:mt-8 [&>h2]:mb-4
                             [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-6 [&>ol]:list-decimal [&>ol]:pl-5
                             [&>img]:rounded-xl [&>img]:shadow-sm [&>img]:my-8 [&>img]:w-full"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              {/* Gallery */}
              <div>
                 <h3 className="text-2xl font-semibold mb-6 text-[#1D1D1F] tracking-tight">Gallery</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {product.galleryImages.map((img, idx) => (
                      <div key={idx} className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 ring-1 ring-gray-100">
                        <img src={img} alt={`Gallery ${idx}`} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" />
                      </div>
                    ))}
                 </div>
              </div>
            </div>

            {/* Sidebar Specs */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white p-8 rounded-[24px] shadow-sm ring-1 ring-gray-100/50 sticky top-20">
                <h3 className="text-[15px] font-semibold mb-6 text-[#1D1D1F]">Specifications</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline py-2 border-b border-gray-50">
                    <span className="text-[#86868b] text-[13px]">Released</span>
                    <span className="font-medium text-[#1D1D1F] text-[13px] flex items-center gap-1.5">
                      <Calendar size={12} className="text-gray-400"/> 
                      {new Date(product.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  
                  {product.attributes.map((attr, idx) => (
                    <div key={idx} className="flex justify-between items-baseline py-2 border-b border-gray-50 last:border-0">
                      <span className="text-[#86868b] text-[13px]">{attr.label}</span>
                      <span className="font-medium text-[#1D1D1F] text-[13px] text-right">{attr.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="text-[13px] font-medium text-[#86868b] mb-3">Team</h4>
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <img 
                        key={i}
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all"
                        src={`https://picsum.photos/seed/${product.id}${i}/32/32`}
                        alt=""
                      />
                    ))}
                    <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-gray-50 text-[10px] text-gray-500 font-medium">
                      +4
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Bottom CTA */}
      <div className="bg-[#1D1D1F] text-white py-24 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-semibold mb-6 tracking-tight">Ready to streamline?</h2>
          <p className="text-gray-400 text-lg mb-10">Access {product.title} securely with your corporate credentials.</p>
          <a 
              href={product.link}
              className="inline-block bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full font-medium text-[15px] transition-colors"
            >
              Launch Application
            </a>
        </div>
      </div>
    </div>
  );
};