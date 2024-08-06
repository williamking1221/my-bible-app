import React from 'react';
import CreateStudyForm from '../components/CreateStudyForm/CreateStudyForm';
import TopBar from '../components/TopBar';

const CreateStudyPage: React.FC = () => {
  return (
    <div>
      <TopBar />
      <CreateStudyForm />
    </div>
  );
};

export default CreateStudyPage;
