// Builds a object from GitHub user
import * as connect from "./connectgql";

export function get(username) {
    return connect.get(username);
}

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
