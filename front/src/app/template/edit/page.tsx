import React, { Suspense } from 'react';
import TemplateEditClient from './TemplateEditClient';

const TemplateEditPage = () => {
  return (
    <Suspense>
      <TemplateEditClient />
    </Suspense>
  );
};

export default TemplateEditPage;
