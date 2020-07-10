from enum import Enum


class ApplicationStatus(Enum):
    CANCELED = 0
    APPLY = 1
    APPLY_APPROVED = 2
    ORDERED = 3
    NOT_ORDERED = 4


class ProjectStatus(Enum):
    OPEN = 0
    CANCELED = 1
    CLOSED = 2
