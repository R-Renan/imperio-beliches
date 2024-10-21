import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const SEO: React.FC<SEOProps> = ({ title, description, children }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {children}
    </Helmet>
  );
};

export default SEO;
