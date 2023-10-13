import React from 'react';
import { useWorkExperience } from '../../../Context/WorkExperienceContext';

type Props = {};

const TotalExp = (props: Props) => {
  const { state } = useWorkExperience();
  // Calculate total years and months of work experience
  const totalExperience = state.reduce(
    (accumulator, experience) => {
      const startDate = new Date(experience.startDate);
      const endDate = new Date(experience.endDate);

      let yearDiff = endDate.getFullYear() - startDate.getFullYear();
      let monthDiff = endDate.getMonth() - startDate.getMonth();
      const dayDiff = endDate.getDate() - startDate.getDate();

      if (dayDiff < 0) {
        // If the day of the end date is earlier, adjust the month difference
        monthDiff--;
      }

      if (monthDiff < 0) {
        // If the month difference is negative, adjust the year difference
        yearDiff--;
        monthDiff += 12;
      }

      // Update the accumulator
      accumulator.years += yearDiff;
      accumulator.months += monthDiff;

      if (accumulator.months >= 12) {
        // Change this line
        accumulator.years += Math.floor(accumulator.months / 12);
        accumulator.months %= 12;
      }

      return accumulator;
    },
    { years: 0, months: 0 }
  );

  return (
    <div className='exp-numbers text-center d-flex flex-column justify-content-center gap-4'>
      <div>
        {totalExperience.years > 0 ? (
          <>
            <h1 className='text-light font-digit mb-0'>
              {totalExperience.years}
              {totalExperience.months > 0 && '+'}
            </h1>
            <p className='text-light text-year line-height-8'>
              {totalExperience.years > 2 ? 'years' : 'year'}
            </p>
          </>
        ) : (
          <>
            <h1 className='text-light font-digit mb-0'>
              {totalExperience.months}
              {totalExperience.months > 0 && '+'}
            </h1>
            <p className='text-light text-year line-height-8'>
              {totalExperience.months >= 2 || totalExperience.months === 0
                ? 'months'
                : 'month'}
            </p>
          </>
        )}
      </div>
      <div>
        <h4 className='text-light mb-0'>
          {totalExperience.years}{' '}
          {totalExperience.years === 1 ? 'year' : 'years'}{' '}
          {totalExperience.months}{' '}
          {totalExperience.months >= 2 || totalExperience.months === 0
            ? 'months'
            : 'month'}
        </h4>
      </div>
    </div>
  );
};

export default TotalExp;
