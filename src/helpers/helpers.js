const assignSkills = (employees, skills) => {
  let result = [...employees];
  //create an object with a skill id as a key and the skill as value
  let skillsRef = {};
  //iterate through skills with skill
  skills.forEach((skill) => {
    //if skillsRef doesn't have id as key, create one with array for value with skill contained
    if (!skillsRef[skill.employeeId]) {
      skillsRef[skill.employeeId] = [skill];
      // console.log("skillsRef is", skillsRef);
    } else {
      skillsRef[skill.employeeId].push(skill);
    }
  });
  //iterate through employees
  result = result.map((employee) => {
    // console.log(employee);
    let nEmployee = { ...employee };
    nEmployee.skills = skillsRef[nEmployee.id] ? skillsRef[nEmployee.id] : [];
    // console.log(nEmployee);
    //iterate through each employees skills assigning skill id and name based on id
    return nEmployee;
  });
  return result;
};

export { assignSkills };
