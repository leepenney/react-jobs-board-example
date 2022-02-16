import React from 'react';
import './JobsList.css';
import * as rssParser from 'react-native-rss-parser';
import { useEffect, useState } from 'react';
import rssExample from './example-rss.xml';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faFileLines, faHashtag, faAnglesUp } from '@fortawesome/free-solid-svg-icons';

const JobsList = () => {

    const [jobs, setJobs] = useState( [] );

    function parseRss() {
        fetch(rssExample)
            .then(response => response.text())
            .then(xml => rssParser.parse(xml))
            .then (rss => rss.items.map((item, index) => ({ref: index, ...item})))
            .then(items => setJobs(items) )
            .catch(error => console.error(`Error in fetch: ${error}`));
    }

    function getCategoryValue(categories, value) {
        const initialSplit = categories.split('/')
        let categorySplit = {
            taxonomy: '',
            salary: '',
            contract_type: '',
            location: '',
        };
        let i = 0;
        for (let prop in categorySplit) {
            categorySplit[prop] = initialSplit[i];
            i++;
        }
        return categorySplit[value];
    }

    function getTitleMinusRef(title) {
        return title.split('Ref.')[0].trim();
    }

    function getJobRef(title) {
        return title.split('Ref.')[1].trim();
    }

    function toggleDescription(e, toggleState) {
        const targetElement = (toggleState === 'show') ? e.target.closest('li') : 
            e.target.closest('li.show');
        targetElement.classList.remove(toggleState === 'show' ? 'hide' : 'show');
        targetElement.classList.add(toggleState === 'show' ? 'show' : 'hide');
    }

    useEffect(() => { 
        parseRss();
    }, []);

    return (
        <ul className="jobs-list">
            {jobs.map(( { ref, title, links, description, authors, categories, pubDate }) => (
               <li key={ref} data-job-id={ref}>
                    <div>
                        <div className="job-company">{authors[0].name}</div>
                        <h3 className="job-title">{getTitleMinusRef(title)}</h3>
                        <div className='job-taxonomy'>{getCategoryValue(categories[0].name, 'taxonomy')}</div>
                   </div>
                   <div className='job-salary'>
                        {getCategoryValue(categories[0].name, 'salary')}
                   </div>
                   <div>
                        <div><FontAwesomeIcon icon={faFileLines} /> {getCategoryValue(categories[0].name, 'contract_type')}</div>
                        <div><FontAwesomeIcon icon={faLocationDot} /> {getCategoryValue(categories[0].name, 'location')}</div>
                        <div><FontAwesomeIcon icon={faHashtag} /> {getJobRef(title)}</div>
                   </div>
                   <div>
                        <button className="button more-info" onClick={(e) => toggleDescription(e, 'show')}>More Info</button>
                   </div>
                   <div className={`job-description`}>
                       <p>{description}</p>
                       <a className="button apply-now" href={links[0].url} 
                            onClick={(e) => { e.preventDefault(); alert(`This is a test site, so these don't work`)}}>Apply Now</a>
                       <button className='close-button' onClick={(e) => toggleDescription(e, 'hide')}>
                           <FontAwesomeIcon icon={faAnglesUp} />
                        </button>
                    </div>
                </li> 
            ))}
        </ul>
    )
}

export default JobsList;