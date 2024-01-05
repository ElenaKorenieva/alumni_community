import React from 'react';
import './SideBarMenu.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfo, faRoad, faCode, faBullseye, faLaptopCode, faRandom, faUser } from '@fortawesome/free-solid-svg-icons';

const SideBarMenu = () => {
    return (
        <div className='menu'>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/posts/home">
                        <FontAwesomeIcon icon={faHome} className="mr-2" />
                        Home
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link to="/about">
                        <FontAwesomeIcon icon={faInfo} className="mr-2" />
                        About the Community
                    </Link>
                </li>
                <li className="list-group-item">
                    <FontAwesomeIcon icon={faRoad} className="mr-2" />
                    The Road so Far
                    <ul>
                        <li className="list-group-item">
                            <Link to="/posts/road-presentation">
                                Presentation
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/road/linkedin">
                                LinkedIn
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/road/reflections">
                                Reflections
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="list-group-item">
                    <FontAwesomeIcon icon={faCode} className="mr-2" />
                    Programming
                    <ul>
                        <li className="list-group-item">
                            <Link to="/road/front-end">
                                Front-end
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/road/random-programming">
                                Back-end
                            </Link>
                        </li><li className="list-group-item">
                            <Link to="/road/back-end">
                                Random Programming
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="list-group-item">
                    <FontAwesomeIcon icon={faBullseye} className="mr-2" />
                    Job Opportunities
                    <ul>
                        <li className="list-group-item">
                            <Link to="/road/internships">
                                Internships
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/road/showcase">
                                Opportunities
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link to="/road/showcase">
                                Showcase
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="list-group-item">
                    <Link to="/github-projects">
                        <FontAwesomeIcon icon={faLaptopCode} className="mr-2" />
                        GitHub Projects
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link to="/random-topics">
                        <FontAwesomeIcon icon={faRandom} className="mr-2" />
                        Random Topics
                    </Link>
                </li>
            </ul>
            <li className="list-group-item">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Account
                <ul>
                    <li className="list-group-item">
                        <Link to="/account-profile">
                            Profile
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/account-signout">
                            Sign out
                        </Link>
                    </li>
                </ul>
            </li>
        </div>
    );
};

export default SideBarMenu;