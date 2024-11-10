import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GetSurveys = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get('https://nghl-api.vercel.app/api/survey/getSurvey');
        setSurveys(response.data);
      } catch (error) {
        console.error('Error fetching surveys:', error);
      }
    };

    fetchSurveys();
  }, []);

  return (
    <div>
      <h1 className='text-center'>Survey IDs and Titles</h1>
      <ul>
        {surveys.map((survey) => (
          <li key={survey.surveyId}><Link to={`/responsetemplate?surveyId=${survey.surveyId}`}>{survey.surveyId} - {survey.title}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default GetSurveys;
