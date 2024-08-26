import prisma from "../../prisma/prismaClient.js";

const checkRolePermission = (entity, action) => async (req, res, next) => {
  try {
    const user = req.user;
    // Fetch the current user's role
    const employee = await prisma.employees.findUnique({
      where: { employeeNumber: Number(user.employeeNumber) },
      include: {
        role_employees_roleTorole: true,
      },
    });

    const userRole = employee.role_employees_roleTorole.role;

    if (entity === "employee") {
      if (action === "read") {
        if (["President", "Manager", "Leader"].includes(userRole)) {
          return next();
        } else {
          return res.status(403).json({
            message: "Staff members are not allowed to read employee data",
          });
        }
      }

      if (action === "create") {
        if (["President", "Manager"].includes(userRole)) {
          return next();
        } else {
          return res.status(403).json({
            message: "Only Presidents and Managers can create employees.",
          });
        }
      }

      if (action === "update") {
        if (["President", "Manager"].includes(userRole)) {
          return next();
        } else {
          return res.status(403).json({
            message: "Only Presidents and Managers can update employees.",
          });
        }
      }

      if (action === "delete") {
        if (userRole === "President") {
          return next();
        } else {
          return res.status(403).json({
            message: "Only Presidents can delete employees.",
          });
        }
      }

      return res.status(403).json({ message: "Forbidden" });
    }

    if (entity === "customer") {
      if (["President", "Manager"].includes(userRole)) {
        return next();
      }
      // Logic for Leader role
      if (userRole === "Leader") {
        if (["read", "create", "update", "delete"].includes(action)) {
          // Only check specific customer if action is update or delete
          if (action === "update" || action === "delete") {
            const targetCustomer = await prisma.customers.findUnique({
              where: { customerNumber: Number(req.params.id) },
            });

            if (!targetCustomer) {
              return res.status(404).json({ message: "Customer not found" });
            }

            const teamMembers = await prisma.employees.findMany({
              where: { officeCode: employee.officeCode },
              select: { employeeNumber: true },
            });

            const teamMemberNumbers = teamMembers.map(
              (emp) => emp.employeeNumber
            );

            if (
              targetCustomer &&
              teamMemberNumbers.includes(targetCustomer.salesRepEmployeeNumber)
            ) {
              return next();
            } else {
              return res.status(403).json({
                message:
                  "Leaders can only perform actions on customers assigned to employees in their team.",
              });
            }
          } else {
            return next();
          }
        }
      }

      // Logic for Staff role
      if (userRole === "Staff") {
        if (action === "read") {
          req.query.salesRepEmployeeNumber = user.employeeNumber; // Limit to self customers
          return next();
        }

        if (action === "create") {
          req.body.salesRepEmployeeNumber = user.employeeNumber; // Assign customer to the staff member creating it
          return next();
        }

        return res.status(403).json({
          message: "Staff members can only read or create their own customers.",
        });
      }

      return res.status(403).json({ message: "Forbidden" });
    }

    return res.status(400).json({ message: "Invalid entity type" });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while checking role permissions",
      error: error.message,
    });
  }
};

export default checkRolePermission;
