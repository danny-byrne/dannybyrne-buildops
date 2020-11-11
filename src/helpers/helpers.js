const assignSkills = (employees, skills) => {
  let result = [...employees];
  //create an object with a skill id as a key and the skill as value
  let skillsRef = {};
  //iterate through skills with skill
  skills.forEach((skill) => {
    //if skillsRef doesn't have id as key, create one with array for value with skill contained
    if (!skillsRef[skill.employeeId]) {
      skillsRef[skill.employeeId] = [skill];
    } else {
      skillsRef[skill.employeeId].push(skill);
    }
  });
  //iterate through employees
  result = result.map((employee) => {
    let nEmployee = { ...employee };
    nEmployee.skills = skillsRef[nEmployee.id] ? skillsRef[nEmployee.id] : [];
    return nEmployee;
  });
  return result;
};

export { assignSkills };
