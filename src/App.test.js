import * as gitLab from './utilities/GitLabUtils';
import * as connector from './utilities/ConnectorUtils';
/*> GitLab Util
 * The point of this utility is to get specific data
 * of a specific user.
 *
 * Usage:
 * gitLab
 * .get('<GitLab server>', '<username>')
 * .then(res => console.log(res));
 */

const call = async () => {
    const obj1 = await gitLab.get('gitlab.htl-villach.at', 'kleberf')
    const obj2 = await gitLab.get('gitlab.htl-villach.at', 'kleberf')
    const obj3 = Object.assign({}, obj1, obj2)
    const test = connector.getCalendarFromStructure(obj3)
    window.localStorage.setItem('USER_CONTRIB', JSON.stringify(test));
    window.localStorage.setItem('USER_DATA_COMBINED', JSON.stringify(obj3));
}
call();

// Get calendar years from local storage
// ---> JSON.parse(window.localStorage.getItem("test"))
