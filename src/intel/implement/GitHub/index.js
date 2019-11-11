import * as apollo from "./apolloclient";
import * as gqlData from "./gqlData";
import * as translator from './translator';

// Get profile and calendar
export async function fill(user) {
  const getPlatform = async (
    username
  ) => {
    const resProfile = await apollo.client.query({
      query: gqlData.GET_PROFILE,
      variables: {
          username
      }
    });

    const {data} = resProfile;
    const createdAtDate = new Date(data.user.createdAt);

    const resCalendar = await apollo.client.query({
      query: gqlData.getCalendar(username, createdAtDate),
    });


    const objUser = {};
    objUser.profile = resProfile.data.user;
    objUser.calendar = resCalendar.data.user;
    translator.fillDB(objUser);
  };

  await getPlatform(user[2]);
}

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
