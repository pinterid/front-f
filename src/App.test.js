import * as gitLab from './utilities/GitLabUtils';

gitLab
.get('gitlab.htl-villach.at', 'kleberf')
.then(res => console.log(res));

