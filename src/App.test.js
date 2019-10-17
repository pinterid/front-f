import * as gitLab from './utilities/GitLabUtils';

/*> GitLab Util
 * The point of this utility is to get specific data
 * of a specific user.
 *
 * Usage:
 * gitLab
 * .get('<GitLab server>', '<username>')
 * .then(res => console.log(res));
 */

gitLab
.get("gitlab.htl-villach.at", "kleberf")
.then((res) => console.log(res));

gitLab
.get("gitlab.htl-villach.at", "woh")
.then((res) => console.log(res));
