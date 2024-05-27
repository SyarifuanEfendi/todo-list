import Tasks from "@/sequelize/models/tasks";

export const create: any = async (request: any) => {
  try {
    let { title, user } = request;

    const task = await Tasks.create({
      title,
      user,
    });
    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};

export const getDataOngoing = async (user: string) => {
  try {
    const task = await Tasks.findAll({
      where: {
        status: "uncheck",
        user,
      },
      order: [["createdAt", "ASC"]],
    });
    return task;
  } catch (error) {}
};

export const getDataComplated = async (user: string) => {
  try {
    const task = await Tasks.findAll({
      where: {
        status: "check",
        user,
      },
      order: [["createdAt", "DESC"]],
    });
    return task;
  } catch (error) {}
};

export const updateData = async (id: string, body: any) => {
  let { title, status, user } = body;
  const task = await Tasks.findByPk(id);

  if (!task) {
    return false;
  }

  task.title = title || task.title;
  task.status = status || task.status;
  task.user = user || task.user;

  await task.save();
  return true;
};

export const deleteData = async (id: string) => {
  try {
    const taskToDelete = await Tasks.findByPk(id);
    if (!taskToDelete) {
      return false;
    }
    await taskToDelete.destroy();
    return true;
  } catch (error) {
    return false;
  }
};
